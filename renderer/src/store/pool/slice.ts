import {createSlice, Action} from 'redux-starter-kit';
import {ThunkAction} from 'redux-thunk';
import {applicationSlice} from '../application/slice';

export const poolSlice = createSlice({
    slice: 'account',
    initialState: {
        availablePools: []
    },
    reducers: {
        setAvailablePools: (state, action) => {
            state.availablePools = action.payload;
            return state;
        },
    }
});

type AppThunk = ThunkAction<void, any, null, Action<string>>

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

export const fetchAvailablePools = (): AppThunk => async dispatch => {
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

