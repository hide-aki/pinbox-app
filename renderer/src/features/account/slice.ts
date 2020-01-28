import {createSlice} from '@reduxjs/toolkit';
import {applicationSlice} from '../../app/slice';
import {PersistenceService} from '../../services/PersistenceService';
import {AccountState, BurstAccountService} from '../../services/BurstAccountService';
import {Account} from '@burstjs/core';
import {convertNumericIdToAddress} from '@burstjs/util';
import {Thunk} from '../../typings/Thunk';
import {ElectronService} from '../../services/ElectronService';
import {AccountReadyMessage} from '../ipcMessaging/outgoing/providers';
import {isEmptyString} from '../../utils/isEmptyString';

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

const fetchBurstAccountInfo = (accountIdent: string = '', publicKey: string = ''): Thunk => async dispatch => {
    try {
        let accountId = accountIdent;
        let pubKey = publicKey;
        if(!accountId.length){
            const a =  persistenceService.getJsonObject(ACC_KEY) as Account;
            if(a){
                accountId = a.account;
                pubKey = a.keys.publicKey;
            }
        }
        const accountService = new BurstAccountService();
        let account = null;
        let accountState = await accountService.verifyAccount(accountId);
        if (accountState === AccountState.NOT_FOUND) {
            account = {
                account: accountId,
                accountRS: convertNumericIdToAddress(accountId),
                balanceNQT: '0',
                keys: {
                    publicKey: pubKey
                }
            };
        } else {
            account = await accountService.fetchAccount(accountId);
        }
        dispatch(accountSlice.actions.setAccount(account));
        if(!isEmptyString(account.keys.publicKey)){
            const electronService = new ElectronService();
            electronService.sendMessage(AccountReadyMessage(account.keys.publicKey))
        }
    } catch (err) {
        dispatch(applicationSlice.actions.showErrorMessage(err.toString()))
    }
};

export const thunks = {
    fetchBurstAccountInfo
};
