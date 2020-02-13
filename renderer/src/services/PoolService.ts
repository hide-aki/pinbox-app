import {PersistenceService} from './PersistenceService';
import {PoolInformation} from '../typings/PoolInformation';
import {IPersistenceService} from '../typings/IPersistenceService';
import {BurstService} from './BurstService';
import {SubscriptionOrder} from '../typings/SubscriptionOrder';
import {
    isAttachmentVersion,
    Transaction,
    TransactionArbitrarySubtype,
    TransactionId,
    TransactionType
} from '@burstjs/core';
import {PoolAccountId} from '../utils/constants';
import {SecureKeyService} from './SecureKeyService';
import {Keys} from '@burstjs/crypto';
import {Subscription} from '../typings/Subscription';

const ItemKeyPool = 'pool';
const ItemKeySubscriptions = 'subscriptions';

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

    async fetchPoolInformation(): Promise<PoolInformation | void> {

        return await this.withApi<PoolInformation | void>(async api => {

            const transactionList = await this.api.account.getAccountTransactions({
                accountId: PoolAccountId,
                subtype: TransactionArbitrarySubtype.Message,
                type: TransactionType.Arbitrary,
            });

            // TODO: Consider older messages, if tx count > 500

            const getMessageText = (transaction: Transaction) =>
                isAttachmentVersion(transaction, 'Message') ? transaction.attachment.message : null

            const poolInformationMessage = transactionList.transactions
                .map(t => <{ sender: string, message: string }>({
                    sender: t.sender,
                    message: getMessageText(t),
                    // timestamp: convertBurstTimeToDate()
                }))
                .filter(({sender, message}) => sender === PoolAccountId && message)
                [0];


            if (!poolInformationMessage) {
                // TODO: translate
                throw new Error(`Could not find any message of Pool ${PoolAccountId}`)
            }

            const poolInformation = JSON.parse(poolInformationMessage.message) as PoolInformation;
            return poolInformation;
        })
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
        await this.withApi<TransactionId>(api =>
            api.account.setRewardRecipient(
                PoolAccountId,
                // TODO: consider the fixed version of setRewardRecipient
                // convertNumberToNQTString(0.1),
                '0.05',
                keys.publicKey,
                keys.signPrivateKey,
            )
        )
    }

    private async fetchGiftSubscription(): Promise<Subscription> {
        // const {gift} = this.getPoolInfo();

        // TODO: implement real fetch
        return Promise.resolve({
            ordered: new Date(),
            value: 1,
            unit: 'G',
            validThru: new Date(),
            cancelable: false,
        })
    }

    private async fetchUserSubscriptions(): Promise<Subscription[]> {

        // TODO: implement real fetch
        return Promise.resolve([{
            ordered: new Date(),
            value: 5,
            unit: 'G',
            validThru: new Date(),
            cancelable: true,
        }])
    }


    async fetchSubscriptions(): Promise<Subscription[]> {

        const [gift, own] = await Promise.all([
            this.fetchGiftSubscription(),
            this.fetchUserSubscriptions(),
        ]);

        // TODO: implement subscriptions in BurstJS and call it here
        return new Promise((resolve => {
                setTimeout(() => {
                    resolve([gift, ...own])
                }, 1000)
            })
        );
    }
}

