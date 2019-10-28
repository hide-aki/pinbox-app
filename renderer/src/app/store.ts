import {configureStore, getDefaultMiddleware, combineReducers} from 'redux-starter-kit';
import {accountSlice} from '../features/account/slice'
import {poolSlice} from '../features/pools/slice';
import {settingsSlice} from '../features/settings/slice';
import {applicationSlice} from './slice';
import {PersistenceService} from '../services/PersistenceService';

const rootReducer = combineReducers({
    account: accountSlice.reducer,
    application: applicationSlice.reducer,
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
