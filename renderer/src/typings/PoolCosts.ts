import {Capacity} from './Capacity';

export interface PoolCosts extends Capacity {
    burstPlanck: string
    periodSecs: number
}
