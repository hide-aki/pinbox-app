import {PersistenceService} from './PersistenceService';
import {PoolInformation} from '../typings/PoolInformation';
import {IPersistenceService} from '../typings/IPersistenceService';

const ItemKey = 'pool';

export class PoolService {
    constructor(private persistenceService: IPersistenceService = new PersistenceService()) {
    }

    hasCurrentPoolStored(): boolean {
        return !!this.persistenceService.getItem(ItemKey);
    }

    storeCurrentPoolUrl(poolUrl: string) {
        this.persistenceService.storeItem(ItemKey, poolUrl);
    }

    getCurrentPoolUrl(): string {
        return this.persistenceService.getItem(ItemKey) || ''
    }

    async getPoolInformation(): Promise<PoolInformation> {

        // TODO: connect to pool and get the messages
        // - connect to url from _getCurrentPool_
        // - eventually cache inside localStorage

        return Promise.resolve({
            costs: {
                burstPlanck: '1000',
                unit: 'M'
            },
            description: 'Mocked Pool',
            name: 'Pool Number One'
        });
    }
}

