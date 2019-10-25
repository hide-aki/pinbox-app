import {PersistenceService} from './PersistenceService';

const  ItemKey = 'pool';

export class PoolService {
    constructor(private persistenceService: PersistenceService = new PersistenceService()) {
    }

    hasPoolStored(): boolean {
        return !!this.persistenceService.getItem(ItemKey);
    }

    storePool(pool: string){
        this.persistenceService.storeItem(ItemKey, pool);
    }

    getPool(): string | null {
        return this.persistenceService.getItem(ItemKey);
    }
}

