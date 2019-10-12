import {configureStore, getDefaultMiddleware} from 'redux-starter-kit';
import {accountSlice} from './account/slice'
import {accountCreationSlice} from './accountCreation/slice';
import {poolSlice} from './pool/slice';
import {applicationSlice} from './application/slice';

export const store = configureStore({
    reducer: {
        account: accountSlice.reducer,
        accountCreation: accountCreationSlice.reducer,
        application: applicationSlice.reducer,
        pool: poolSlice.reducer
    },
    middleware: [...getDefaultMiddleware()]
});

