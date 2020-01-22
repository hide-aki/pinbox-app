import {createSlice, Action} from '@reduxjs/toolkit';
import {applicationSlice} from '../../app/slice';
import {PoolService} from '../../services/PoolService';
import {Thunk} from '../../typings/Thunk';

const poolService = new PoolService();

export const poolSlice = createSlice({
    name: 'account',
    initialState: {
        availablePools: [],
        currentPool: poolService.getCurrentPool()
    },
    reducers: {
        setAvailablePools: (state, action) => {
            state.availablePools = action.payload;
        },
        setPool: (state, {payload: pool}) => {
            poolService.storeCurrentPool(pool);
            state.currentPool = pool;
        }
    }
});


const mockedPools = [
    {
        name: "Pool #1",
        description: "The very first pinbox pool",
        url: "https://pool1.pinbox.io",
    },
    {
        name: "Pool #2",
        description: "The very second pinbox pool",
        url: "https://pool2.pinbox.io",
    }
];

function mockPools() {
    return Promise.resolve(mockedPools);
}

const fetchAvailablePools = (): Thunk => async dispatch => {
    try {
        const pools = await mockPools();
        dispatch(poolSlice.actions.setAvailablePools(pools))
    } catch (err) {
        dispatch(applicationSlice.actions.showErrorMessage(err.toString()))
    }
};

export const thunks = {
    fetchAvailablePools
};

