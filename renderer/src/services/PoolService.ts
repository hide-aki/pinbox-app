import {PersistenceService} from './PersistenceService';
import {PoolInformation} from '../typings/PoolInformation';
import {IPersistenceService} from '../typings/IPersistenceService';
import {convertNumberToNQTString} from '@burstjs/util';
import {BurstService} from './BurstService';
import {SubscriptionOrder} from '../typings/SubscriptionOrder';
import {SecondsPerDay} from '../utils/constants';

const ItemKey = 'pool';
// TODO: make this configurable
const PoolAddress = 'BURST-1234';

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
        // TODO: connect to pool and get the messages
        // use Address of Pool and get from message from Blockchain
        return Promise.resolve({
            costs: {
                burstPlanck: convertNumberToNQTString(1),
                unit: 'M',
                capacity: 1,
                periodSecs: SecondsPerDay
            },
            description: 'Mocked Pool',
            name: 'Pool Number One',
            url: 'https://pool.pinbox.space',
        });
    }

    async commitSubscriptionOrder(order: SubscriptionOrder) : Promise<void> {
        // TODO: implement subscriptions in BurstJS and call it here
        return new Promise((resolve => {
            setTimeout(resolve, 1000)
        }));

    }
}

