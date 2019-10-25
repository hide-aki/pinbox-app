import {IPoolDescription} from '../../typings/IPoolDescription';

export const selectAvailablePools = (state:any): IPoolDescription[] => state.pool.availablePools;
export const selectCurrentPool = (state:any): IPoolDescription => state.pool.pool;
