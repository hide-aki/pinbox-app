import {PoolCosts} from './PoolCosts';
import {Capacity} from './Capacity';

export interface PoolInformation {
    url: string,
    name: string,
    description: string,
    costs: PoolCosts,
    freeSpace: Capacity,
}



