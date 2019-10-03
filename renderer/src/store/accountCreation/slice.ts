import {createSlice} from 'redux-starter-kit';

export const accountCreationSlice = createSlice({
    slice: 'accountCreation',
    initialState: {
        passphrase: ''
    },
    reducers: {
        setPassphrase: (state,action) => {
            state.passphrase = action.payload;
            return state;
        },
    }
});
