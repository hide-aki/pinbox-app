import {createSlice} from 'redux-starter-kit';

export const accountSlice = createSlice({
    slice: 'account',
    initialState: {
        account: null
    },
    reducers: {
        setAccount: state => state,
    }
});
