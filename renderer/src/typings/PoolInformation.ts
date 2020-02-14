import {PoolCosts} from './PoolCosts';
import {TimedCapacity} from './TimedCapacity';
import {Versionable} from './Versionable';

export interface PoolInformation extends Versionable {
    url: string,
    name: string,
    description: string,
    costs: PoolCosts,
    gift: TimedCapacity,
    timestamp: number
}

