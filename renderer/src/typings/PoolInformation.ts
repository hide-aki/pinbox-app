import {PoolCosts} from './PoolCosts';
import {TimedCapacity} from './TimedCapacity';

export interface PoolInformation {
    url: string,
    name: string,
    description: string,
    costs: PoolCosts,
    gift: TimedCapacity,
    lastModified: number
}

