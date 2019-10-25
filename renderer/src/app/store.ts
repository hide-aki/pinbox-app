import {configureStore, getDefaultMiddleware} from 'redux-starter-kit';
import {accountSlice} from '../features/account/slice'
import {poolSlice} from '../features/pools/slice';
import {applicationSlice} from './slice';

export const store = configureStore({
    reducer: {
        account: accountSlice.reducer,
        application: applicationSlice.reducer,
        pool: poolSlice.reducer
    },
    middleware: [...getDefaultMiddleware()]
});

