import {PersistenceService} from './PersistenceService';
import {PoolInformation} from '../typings/PoolInformation';
import {IPersistenceService} from '../typings/IPersistenceService';
import {convertNumberToNQTString} from '@burstjs/util';
import {BurstService} from './BurstService';
import {SubscriptionOrder} from '../typings/SubscriptionOrder';
import {SecondsPerDay} from '../utils/constants';
import {isAttachmentVersion, Transaction, TransactionArbitrarySubtype, TransactionType} from '@burstjs/core';

const ItemKey = 'pool';
// TODO: make this configurable
const PoolAccountId = '8670031239301854975';
const PoolAccountAddress = 'BURST-2XRZ-H9T4-VVF5-95KNJ';



export class PoolService extends BurstService {
    constructor(private persistenceService: IPersistenceService = new PersistenceService()) {
        super();
    }

    storePoolInfo(poolInformation: PoolInformation) {
        this.persistenceService.storeJsonObject(ItemKey, poolInformation);
    }

    getPoolInfo(): PoolInformation | null {
        return this.persistenceService.getJsonObject(ItemKey) as PoolInformation;
    }

    async fetchPoolInformation(): Promise<PoolInformation> {

        const transactionList = await this.api.account.getAccountTransactions({
            accountId: PoolAccountId,
            subtype: TransactionArbitrarySubtype.Message,
            type: TransactionType.Arbitrary,
        });

        const getMessageText = (transaction: Transaction) =>
            isAttachmentVersion(transaction, 'Message') ? transaction.attachment.message : null

        const poolInformationMessage = transactionList.transactions
            .map(t => <{sender:string, message:string}>({
                sender: t.sender,
                message: getMessageText(t),
            }))
            .filter(({sender, message}) => sender === PoolAccountId && message)
            [0];

        if(!poolInformationMessage){
            throw new Error(`Could not find any message of Pool ${PoolAccountId}`)
        }

        return JSON.parse(poolInformationMessage.message) as PoolInformation;
    }

    async commitSubscriptionOrder(order: SubscriptionOrder): Promise<void> {
        // TODO: implement subscriptions in BurstJS and call it here
        return new Promise((resolve => {
            setTimeout(resolve, 1000)
        }));

    }
}

