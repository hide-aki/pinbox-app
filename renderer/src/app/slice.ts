import {createSlice} from '@reduxjs/toolkit';

export const applicationSlice = createSlice({
    name: 'application',
    initialState: {
        message: {
            type: 'NONE',
            text: ''
        }
    },
    reducers: {
        showMessage: (state, action) => {
            const {type, text} = action.payload;
            state.message = {type, text}
        },
        showErrorMessage: (state, action) => {
            const {text} = action.payload;
            state.message = {type: 'ERROR', text}
        },
        hideMessage: (state, action) => {
            state.message = {type: 'NONE', text: ''}
        },
        // application/reset will be handled on root reducer level (store.ts)
        reset: state => state
    }
});

