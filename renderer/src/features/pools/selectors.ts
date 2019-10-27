import {IPoolDescription} from '../../typings/IPoolDescription';

export const selectAvailablePools = (state:any): IPoolDescription[] => state.pool.availablePools;
export const selectCurrentPoolId = (state:any): string => state.pool.currentPool || '';
export const selectCurrentPool = (state:any): IPoolDescription | null => {
    const  {availablePools, currentPool : poolUrl} = state.pool;
    return availablePools.find( (p:IPoolDescription) => p.url === poolUrl) || null;
};
