import {Capacity} from './Capacity';

export interface Subscription extends Capacity{
    ordered: Date,
    validThru: Date,
    cancelable: boolean,
}
