import {PersistenceService} from './PersistenceService';
import {PoolInformation} from '../typings/PoolInformation';
import {IPersistenceService} from '../typings/IPersistenceService';

const ItemKey = 'pool';

export class PoolService {
    constructor(private persistenceService: IPersistenceService = new PersistenceService()) {
    }

    storePoolInfo(poolInformation: PoolInformation) {
        this.persistenceService.storeJsonObject(ItemKey, poolInformation);
    }

    getPoolInfo(): PoolInformation | null {
        return this.persistenceService.getJsonObject(ItemKey) as PoolInformation;
    }

    async fetchPoolInformation(burstAddress: string): Promise<PoolInformation> {
        // TODO: connect to pool and get the messages
        // use Address of Pool and get from Blockchain

        return Promise.resolve({
            costs: {
                burstPlanck: '1000',
                unit: 'K',
                periodSecs: 1000
            },
            description: 'Mocked Pool',
            name: 'Pool Number One',
            url: 'https://pool.pinbox.space',
        });
    }
}

