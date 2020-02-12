import {Unit} from './Unit';

export interface TimedCapacity {
    unit: Unit
    capacity: number,
    periodSecs: number
}
