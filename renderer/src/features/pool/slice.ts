import {createSlice, Action} from '@reduxjs/toolkit';
import {applicationSlice} from '../../app/slice';
import {PoolService} from '../../services/PoolService';
import {Thunk} from '../../typings/Thunk';

const poolService = new PoolService();

// TODO: make this configurable
const PoolAddress = 'BURST-1234';

export const poolSlice = createSlice({
    name: 'pool',
    initialState: {
        info: poolService.getPoolInfo(),
    },
    reducers: {
        setPool: (state, {payload: poolInfo}) => {
            poolService.storePoolInfo(poolInfo);
            state.info = poolInfo;
        }
    }
});

const fetchPoolInformation = (): Thunk => async dispatch => {
    try {
        const service = new PoolService();
        const poolInformation = await service.fetchPoolInformation(PoolAddress);
        dispatch(poolSlice.actions.setPool(poolInformation))
    } catch (err) {
        dispatch(applicationSlice.actions.showErrorMessage(err.toString()))
    }
};

export const thunks = {
    fetchPoolInformation,
};

