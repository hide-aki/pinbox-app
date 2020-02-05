import {configureStore, getDefaultMiddleware, combineReducers} from '@reduxjs/toolkit';
import {accountSlice} from '../features/account/slice'
import {dashboardSlice} from '../features/dashboard/slice'
import {poolSlice} from '../features/pool/slice';
import {settingsSlice} from '../features/settings/slice';
import {applicationSlice} from './slice';
import {PersistenceService} from '../services/PersistenceService';

const rootReducer = combineReducers({
    account: accountSlice.reducer,
    application: applicationSlice.reducer,
    dashboard: dashboardSlice.reducer,
    pool: poolSlice.reducer,
    settings: settingsSlice.reducer,
});

export const store = configureStore({
    reducer: (state, action) => {
        if(action.type === 'application/reset') {
            new PersistenceService().clear();
            state = undefined;
        }
        return rootReducer(state, action);
    },
    middleware: [...getDefaultMiddleware()],
});
