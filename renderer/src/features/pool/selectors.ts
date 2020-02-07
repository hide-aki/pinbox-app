import {PoolInformation} from '../../typings/PoolInformation';

export const poolInfoSelector = (state:any): PoolInformation | null => state.pool.info;
export const isOrderingSelector = (state:any): boolean => state.pool.isOrdering;
