import {Action, createSlice} from '@reduxjs/toolkit';
import {ThunkAction} from 'redux-thunk';
import {applicationSlice} from '../../app/slice';
import {PersistenceService} from '../../services/PersistenceService';
import {AccountState, BurstAccountService} from '../../services/BurstAccountService';
import {Account} from '@burstjs/core';
import {convertNumericIdToAddress} from '@burstjs/util';
import {Thunk} from '../../typings/Thunk';

const ACC_KEY = 'acc';

const persistenceService = new PersistenceService();

export const accountSlice = createSlice({
    name: 'account',
    initialState: {
        account: {}
    },
    reducers: {
        setAccount: (state, action) => {
            state.account = action.payload;
            persistenceService.storeJsonObject(ACC_KEY, state.account);
            return state
        }
    }
});

const fetchBurstAccountInfo = (accountIdent: string = ''): Thunk => async dispatch => {
    try {
        let accountId = accountIdent;
        if(!accountId.length){
            const a =  persistenceService.getJsonObject(ACC_KEY) as Account;
            if(a){ accountId = a.account }
        }
        const accountService = new BurstAccountService();
        let account = null;
        let accountState = await accountService.verifyAccount(accountId);
        if (accountState === AccountState.NOT_FOUND) {
            account = {
                account: accountId,
                accountRS: convertNumericIdToAddress(accountId),
                balanceNQT: '0',
            };
        } else {
            account = await new BurstAccountService().fetchAccount(accountId);
        }
        dispatch(accountSlice.actions.setAccount(account));
    } catch (err) {
        dispatch(applicationSlice.actions.showErrorMessage(err.toString()))
    }
};

export const thunks = {
    fetchBurstAccountInfo
};
