import {PoolInformation} from '../../typings/PoolInformation';
import {Subscription} from '../../typings/Subscription';

export const poolInfoSelector = (state:any): PoolInformation | null => state.pool.info;
export const isOrderingSelector = (state:any): boolean => state.pool.isOrdering;
export const subscriptionsSelector = (state:any): Subscription[] => state.pool.subscriptions;
