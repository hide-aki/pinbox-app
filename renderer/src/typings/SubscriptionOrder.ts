import {Unit} from './Unit';

export interface SubscriptionOrder {
    capacity: number,
    unit: Unit,
    periodSecs: number,
}
