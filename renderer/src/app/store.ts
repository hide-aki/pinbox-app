import {configureStore, getDefaultMiddleware, combineReducers} from '@reduxjs/toolkit';
import {accountSlice} from '../features/account/slice'
import {dashboardSlice} from '../features/dashboard/slice'
import {poolSlice} from '../features/pools/slice';
import {settingsSlice} from '../features/settings/slice';
import {applicationSlice} from './slice';
import {PersistenceService} from '../services/PersistenceService';
import {RouteProviders} from '../routing/routes';

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
            window.location.replace(RouteProviders.Index());
            state = undefined;
        }
        return rootReducer(state, action);
    },
    middleware: [...getDefaultMiddleware()],
});
