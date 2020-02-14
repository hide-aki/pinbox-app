import {PersistenceService} from './PersistenceService';
import {PoolInformation} from '../typings/PoolInformation';
import {IPersistenceService} from '../typings/IPersistenceService';
import {BurstService} from './BurstService';
import {SubscriptionOrder} from '../typings/SubscriptionOrder';
import {isAttachmentVersion, Transaction, TransactionArbitrarySubtype, TransactionType} from '@burstjs/core';
import {PoolAccountId} from '../utils/constants';
import {SecureKeyService} from './SecureKeyService';
import {Keys} from '@burstjs/crypto';
import {Subscription} from '../typings/Subscription';
import {isEmptyString} from '../utils/isEmptyString';
import {convertBurstTimeToEpochTime} from '@burstjs/util';

const ItemKeyPool = 'pool';

interface PoolMessage {
    sender: string,
    message: string,
    timestamp: number,
}

export class PoolService extends BurstService {
    constructor(private persistenceService: IPersistenceService = new PersistenceService()) {
        super();
    }

    storePoolInfo(poolInformation: PoolInformation) {
        this.persistenceService.storeJsonObject(ItemKeyPool, poolInformation);
    }

    getPoolInfo(): PoolInformation | null {
        return this.persistenceService.getJsonObject(ItemKeyPool) as PoolInformation;
    }

    async fetchAllPoolInformationMessages(): Promise<PoolInformation[]> {
        return this.withBrsErrorTranslation<Promise<PoolInformation[]>>(async (): Promise<any> => {
            const getMessageText = (transaction: Transaction) =>
                isAttachmentVersion(transaction, 'Message') ? transaction.attachment.message : null

            const toMessage = (t: Transaction): PoolMessage => ({
                sender: t.sender || '',
                message: getMessageText(t),
                timestamp: t.timestamp || 0,
            });

            const toPoolInformation = ({message, timestamp}: PoolMessage): PoolInformation | null => {
                try {
                    const info = JSON.parse(message) as PoolInformation;
                    info.timestamp = timestamp;
                    return info;
                } catch (e) {
                    return null;
                }
            };

            const isNotNull = (p: PoolInformation | null): boolean => p !== null;

            const isPoolInfoMessage = ({sender, message}: PoolMessage): boolean => sender === PoolAccountId && !isEmptyString(message);

            // TODO: Consider >500 messages
            const {transactions} = await this.api.account.getAccountTransactions({
                accountId: PoolAccountId,
                subtype: TransactionArbitrarySubtype.Message,
                type: TransactionType.Arbitrary,
            });

            return transactions
                .map(toMessage)
                .filter(isPoolInfoMessage)
                .map(toPoolInformation)
                .filter(isNotNull)
        })
    }

    async fetchPoolInformation(): Promise<PoolInformation> {
        const poolInformationMessages = await this.fetchAllPoolInformationMessages();
        const sortByModified = (a: PoolInformation, b: PoolInformation): number => b.timestamp - a.timestamp
        if (poolInformationMessages.length === 0) throw new Error("error.no_pool_info");
        return poolInformationMessages.sort(sortByModified)[0];
    }

    async commitSubscriptionOrder(order: SubscriptionOrder): Promise<void> {
        // TODO: implement subscriptions in BurstJS and call it here
        return new Promise((resolve => {
                setTimeout(resolve, 1000)
            })
        );
    }

    async claimFreeSpace(pin: string): Promise<void> {
        const service = new SecureKeyService();
        let keys: Keys;
        try {
            keys = service.getKeys(pin);
        } catch (e) {
            throw new Error('error.incorrect_pin')
        }
        await this.withBrsErrorTranslation(() => {
            return this.api.account.setRewardRecipient(
                PoolAccountId,
                // TODO: consider the fixed version of setRewardRecipient
                // convertNumberToNQTString(0.1),
                '0.01', // This is a bug in burstjs --- calls it NQT but is expecting BURST
                keys.publicKey,
                keys.signPrivateKey,
            )
        });
    }

}

