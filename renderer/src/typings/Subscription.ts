import {Capacity} from './Capacity';

export interface Subscription extends Capacity{
    orderDate: number,
    validThru: number,
    cancelable: boolean,
}
