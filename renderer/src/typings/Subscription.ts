import {Capacity} from './Capacity';
import {Versionable} from './Versionable';

export interface Subscription extends Capacity, Versionable {
    startTimestamp: number,
    endTimestamp: number,
    cancelable: boolean,
}
