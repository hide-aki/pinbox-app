import {PersistenceService} from './PersistenceService';

const  ItemKey = 'pool';

export class PoolService {
    constructor(private persistenceService: PersistenceService = new PersistenceService()) {
    }

    hasCurrentPoolStored(): boolean {
        return !!this.persistenceService.getItem(ItemKey);
    }

    storeCurrentPool(pool: string){
        this.persistenceService.storeItem(ItemKey, pool);
    }

    getCurrentPool(): string {
        return this.persistenceService.getItem(ItemKey) || ''
    }
}

