import {PoolDescription} from '../../typings/PoolDescription';

export const selectAvailablePools = (state:any): PoolDescription[] => state.pool.availablePools;
export const selectCurrentPoolId = (state:any): string => state.pool.currentPool || '';
export const selectCurrentPool = (state:any): PoolDescription | null => {
    const  {availablePools, currentPool : poolUrl} = state.pool;
    return availablePools.find( (p:PoolDescription) => p.url === poolUrl) || null;
};
