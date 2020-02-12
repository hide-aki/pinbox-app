import {createSlice} from '@reduxjs/toolkit';
import {applicationSlice} from '../../app/slice';
import {PersistenceService} from '../../services/PersistenceService';
import {AccountState, BurstAccountService} from '../../services/BurstAccountService';
import {convertNumericIdToAddress} from '@burstjs/util';
import {Thunk} from '../../typings/Thunk';
import {ElectronService} from '../../services/ElectronService';
import {AccountReadyMessage} from '../ipcMessaging/outgoing/providers';
import {isEmptyString} from '../../utils/isEmptyString';
import {BurstAccount} from '../../typings/BurstAccount';
import {Tristate} from '../../typings/Tristate';
import {OnEventFn} from '../../typings/OnEventFn';
import {voidFn} from '../../utils/voidFn';

const ACC_KEY = 'acc';

const persistenceService = new PersistenceService();

export const accountSlice = createSlice({
    name: 'account',
    initialState: {
        accountIsReady: false,
        activationState: Tristate.NotStartedYet,
        account: {} // BurstAccount type
    },
    reducers: {
        setAccount: (state, action) => {
            state.account = action.payload;
            persistenceService.storeJsonObject(ACC_KEY, state.account);
        },
        clearAccount: (state, action) => {
            state.account = {};
            persistenceService.storeJsonObject(ACC_KEY, state.account);
        },
        setClaimSpaceState: (state, action) => {
            // @ts-ignore
            state.account.claimSpaceState = action.payload;
            persistenceService.storeJsonObject(ACC_KEY, state.account);
        },
        setActivationState: (state, action) => {
            // @ts-ignore
            state.activationState = action.payload;
            persistenceService.storeJsonObject(ACC_KEY, state.account);
        },
        setAccountIsReady: (state, action) => {
            // @ts-ignore
            state.accountIsReady = action.payload;
        },
    }
});

const fetchBurstAccountInfo = (accountIdent: string = '', publicKey: string = ''): Thunk => async (dispatch, getState) => {
    try {
        let claimSpaceState = Tristate.NotStartedYet;
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

        let account: BurstAccount;
        const accountService = new BurstAccountService();
        let accountState = await accountService.verifyAccount(accountId);
        if (accountState === AccountState.NotFound) {
            // @ts-ignore
            account = {
                account: accountId,
                accountRS: convertNumericIdToAddress(accountId),
                balanceNQT: '0',
                publicKey: pubKey,
            };
        } else {
            account = await accountService.fetchAccount(accountId);
        }

        account.claimSpaceState = claimSpaceState;
        dispatch(accountSlice.actions.setAccount(account));

        if (accountState === AccountState.Active) {
            dispatch(accountSlice.actions.setActivationState(Tristate.Finished));
        }

        if (!getState().account.accountIsReady && !isEmptyString(pubKey)) {
            const electronService = new ElectronService();
            electronService.sendMessage(AccountReadyMessage(pubKey));
            accountSlice.actions.setAccountIsReady(true);
        }

        if (claimSpaceState === Tristate.Pending) {
            const hasClaimed = await accountService.verifyHasClaimedFreeSpace(accountId);
            dispatch(accountSlice.actions.setClaimSpaceState(hasClaimed ? Tristate.Finished : claimSpaceState));
        }

    } catch (e) {
        dispatch(applicationSlice.actions.showErrorMessage(e.message || e.toString()))
    }
};

const activateBurstAccount = (publicKey: string = '', onRequestFinished: OnEventFn<boolean> = voidFn): Thunk => async dispatch => {
    try {
        const accountService = new BurstAccountService();
        await accountService.activateAccount(publicKey);
        dispatch(accountSlice.actions.setActivationState(Tristate.Pending));
        onRequestFinished(true);
    } catch (e) {
        console.log('here', JSON.stringify(e))
        dispatch(applicationSlice.actions.showErrorMessage(e.message));
        onRequestFinished(false);
    }
};

export const accountThunks = {
    fetchBurstAccountInfo,
    activateBurstAccount,
};
