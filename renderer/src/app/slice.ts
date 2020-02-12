import {createSlice} from '@reduxjs/toolkit';
import {MessageType} from '../typings/NotificationMessage';

export const applicationSlice = createSlice({
    name: 'application',
    initialState: {
        message: {
            type: MessageType.None,
            text: ''
        },
        isIpfsReady: false,
        hasEnteredPin: false,
        userInactive: false,
    },
    reducers: {
        updateIpfsStatus: (state, action) => {
            state.isIpfsReady = action.payload;
        },
        setHasEnteredPin: (state, action) => {
            state.hasEnteredPin = action.payload;
        },
        setUserInactive: (state, action) => {
            state.userInactive = action.payload;
            if (state.userInactive) {
                state.hasEnteredPin = false;
            }
        },
        showMessage: (state, action) => {
            const {type, text} = action.payload;
            state.message = {type, text}
        },
        showErrorMessage: (state, action) => {
            const text = action.payload;
            console.log('text', text)
            state.message = {type: MessageType.Error, text}
        },
        showSuccessMessage: (state, action) => {
            const text = action.payload;
            state.message = {type: MessageType.Success, text}
        },
        showInfoMessage: (state, action) => {
            const text = action.payload;
            state.message = {type: MessageType.Information, text}
        },
        hideMessage: (state, action) => {
            state.message = {type: MessageType.None, text: ''}
        },
        // application/reset will be handled on root reducer level (store.ts)
        reset: state => state
    }
});

