import {IPoolDescription} from '../../typings/IPoolDescription';

export const selectAvailablePools = (state:any): IPoolDescription[] => state.pool.availablePools;
