import {configureStore, getDefaultMiddleware} from 'redux-starter-kit';
import {accountSlice} from './accountSlice'
import {accountCreationSlice} from './accountCreationSlice';

export const store = configureStore({
    reducer : {
        account: accountSlice.reducer,
        accountCreation: accountCreationSlice.reducer,
    },
    middleware: [...getDefaultMiddleware()]
});

