import {IPoolDescription} from '../../typings/IPoolDescription';

export const selectAvailablePools = (state:any): IPoolDescription[] => state.pool.availablePools;
export const selectCurrentPoolId = (state:any): string => state.pool.currentPool;
