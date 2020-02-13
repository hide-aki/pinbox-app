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
const ItemKeySubscriptions = 'subscriptions';

interface PoolMessage {
    sender: string,
    message: string,
    blockTimestamp: number,
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

    storeSubscriptions(subscriptions: Subscription[]) {
        this.persistenceService.storeJsonObject(ItemKeySubscriptions, subscriptions);
    }

    getSubscriptions(): Subscription[] | null {
        return this.persistenceService.getJsonObject(ItemKeySubscriptions) as Subscription[];
    }

    async fetchAllPoolInformationMessages(): Promise<PoolInformation[]> {
        return this.withBrsErrorTranslation<Promise<PoolInformation[]>>(async (): Promise<any> => {
            const getMessageText = (transaction: Transaction) =>
                isAttachmentVersion(transaction, 'Message') ? transaction.attachment.message : null

            const toMessage = (t: Transaction): PoolMessage => ({
                sender: t.sender || '',
                message: getMessageText(t),
                blockTimestamp: t.blockTimestamp || 0,
            });

            const toPoolInformation = ({message, blockTimestamp}: PoolMessage): PoolInformation | null => {
                try {
                    const info = JSON.parse(message) as PoolInformation;
                    info.lastModified = convertBurstTimeToEpochTime(blockTimestamp);
                    return info;
                } catch (e) {
                    return null;
                }
            };

            const isNotNull = (p: PoolInformation | null): boolean => p !== null;

            const isPoolInfoMessage = ({sender, message}: PoolMessage): boolean => sender === PoolAccountId && !isEmptyString(message);

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
        const sortByModified = (a: PoolInformation, b: PoolInformation): number => b.lastModified - a.lastModified
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
                '0.01',
                keys.publicKey,
                keys.signPrivateKey,
            )
        });
    }

}

