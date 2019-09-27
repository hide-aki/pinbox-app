import {configureStore, getDefaultMiddleware} from 'redux-starter-kit';
import {accountSlice} from './accountSlice'


export const store = configureStore({
    reducer : {
        account: accountSlice.reducer
    },
    middleware: [...getDefaultMiddleware()]
});

