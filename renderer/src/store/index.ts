import {configureStore, getDefaultMiddleware} from 'redux-starter-kit';
import {accountSlice} from './account/slice'
import {accountCreationSlice} from './accountCreation/slice';

export const store = configureStore({
    reducer: {
        account: accountSlice.reducer,
        accountCreation: accountCreationSlice.reducer,
    },
    middleware: [...getDefaultMiddleware()]
});

