import {PoolInformation} from '../../typings/PoolInformation';

export const selectPoolInfo = (state:any): PoolInformation | null => state.pool.info;
