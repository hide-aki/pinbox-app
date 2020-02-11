import {createSlice} from '@reduxjs/toolkit';
import {applicationSlice} from '../../app/slice';
import {PersistenceService} from '../../services/PersistenceService';
import {AccountState, BurstAccountService} from '../../services/BurstAccountService';
import {convertNumericIdToAddress} from '@burstjs/util';
import {Thunk} from '../../typings/Thunk';
import {ElectronService} from '../../services/ElectronService';
import {AccountReadyMessage} from '../ipcMessaging/outgoing/providers';
import {isEmptyString} from '../../utils/isEmptyString';
import {BurstAccount, ClaimState} from '../../typings/BurstAccount';

const ACC_KEY = 'acc';

const persistenceService = new PersistenceService();

export const accountSlice = createSlice({
    name: 'account',
    initialState: {
        account: {} // BurstAccount type
    },
    reducers: {
        setAccount: (state, action) => {
            state.account = action.payload;
            persistenceService.storeJsonObject(ACC_KEY, state.account);
            return state
        },
        clearAccount: (state, action) => {
            state.account = {};

            persistenceService.storeJsonObject(ACC_KEY, state.account);
            return state
        },
        setClaimSpaceState: (state, action) => {
            // @ts-ignore
            state.account.claimSpaceState = action.payload;
            persistenceService.storeJsonObject(ACC_KEY, state.account);
        }
    }
});

const fetchBurstAccountInfo = (accountIdent: string = '', publicKey: string = ''): Thunk => async dispatch => {
    try {
        let claimSpaceState = ClaimState.NotClaimedYet;
        let accountId = accountIdent;
        let pubKey = publicKey;
        if (!accountId.length) {
            const a = persistenceService.getJsonObject(ACC_KEY) as BurstAccount;
            if (a) {
                accountId = a.account;
                pubKey = a.publicKey;
                claimSpaceState = a.claimSpaceState;
            }
        }

        const accountService = new BurstAccountService();
        let account = null;
        let accountState = await accountService.verifyAccount(accountId);
        if (accountState === AccountState.NotFound) {
            account = {
                account: accountId,
                accountRS: convertNumericIdToAddress(accountId),
                balanceNQT: '0',
                publicKey: pubKey,
            };
        } else {
            account = await accountService.fetchAccount(accountId);
        }

        // @ts-ignore
        account.claimSpaceState = claimSpaceState;
        dispatch(accountSlice.actions.setAccount(account));

        // TODO: memoize this to avoid permanent IFS reloads
        if (!isEmptyString(pubKey)) {
            const electronService = new ElectronService();
            electronService.sendMessage(AccountReadyMessage(pubKey))
        }

        if(claimSpaceState === ClaimState.ClaimPending){
            const hasClaimed = await accountService.verifyHasClaimedFreeSpace(accountId);
            dispatch(accountSlice.actions.setClaimSpaceState(hasClaimed ? ClaimState.Claimed : claimSpaceState ));
        }

    } catch (err) {
        dispatch(applicationSlice.actions.showErrorMessage(err.toString()))
    }
};

export const thunks = {
    fetchBurstAccountInfo
};
