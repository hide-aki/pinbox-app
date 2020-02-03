import {createSlice, Action} from '@reduxjs/toolkit';
import {applicationSlice} from '../../app/slice';
import {PoolService} from '../../services/PoolService';
import {Thunk} from '../../typings/Thunk';

const poolService = new PoolService();

// THIS FILE IS USED ONLY WHEN MULTIPLE POOLS ARE AVAILABLE


const mockedPools = [
    {
        name: "Pool #1",
        description: "The very first pinbox pool",
        url: "https://pool1.pinbox.io",
    },
];

export const poolSlice = createSlice({
    name: 'account',
    initialState: {
        availablePools: mockedPools,
        // one fixed pool yet
        currentPool: mockedPools[0].url,
    },
    reducers: {
        setAvailablePools: (state, action) => {
            state.availablePools = action.payload;
        },
        setPool: (state, {payload: pool}) => {
            poolService.storeCurrentPoolUrl(pool);
            state.currentPool = pool;
        }
    }
});


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

