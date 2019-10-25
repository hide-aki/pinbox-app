import {Action, createSlice} from 'redux-starter-kit';
import {ThunkAction} from 'redux-thunk';
import {applicationSlice} from '../../app/slice';
import {PersistenceService} from '../../services/PersistenceService';
import {BurstAccountService} from '../../services/BurstAccountService';

const ACC_KEY = 'acc';

const persistenceService = new PersistenceService();

export const accountSlice = createSlice({
    slice: 'account',
    initialState: {
        account: persistenceService.getJsonObject(ACC_KEY)
    },
    reducers: {
        setAccount: (state, action) => {
            state.account = action.payload
        }
    }
});

type AppThunk = ThunkAction<void, any, null, Action<string>>

export const fetchBurstAccountInfo = (accountId: string): AppThunk => async dispatch => {
    try {
        const account = await new BurstAccountService().getAccount(accountId);
        dispatch(accountSlice.actions.setAccount(account));
        persistenceService.storeJsonObject(ACC_KEY, account);
    } catch (err) {
        dispatch(applicationSlice.actions.showErrorMessage(err.toString()))
    }
};
