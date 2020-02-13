import {createSlice} from '@reduxjs/toolkit';
import {applicationSlice} from '../../app/slice';
import {PoolService} from '../../services/PoolService';
import {Thunk} from '../../typings/Thunk';
import {SubscriptionOrder} from '../../typings/SubscriptionOrder';
import {accountSlice} from '../account/slice';
import {Tristate} from '../../typings/Tristate';
import {OnEventFn} from '../../typings/OnEventFn';
import {voidFn} from '../../utils/voidFn';
import {Subscription} from '../../typings/Subscription';

const poolService = new PoolService();
export const poolSlice = createSlice({
    name: 'pool',
    initialState: {
        info: poolService.getPoolInfo(),
        isOrdering: false,
        subscriptions: poolService.getSubscriptions() || [],
    },
    reducers: {
        setPool: (state, {payload: poolInfo}) => {
            poolService.storePoolInfo(poolInfo);
            state.info = poolInfo;
        },
        setSubscriptions: (state, {payload: subscriptions}) => {
            poolService.storeSubscriptions(subscriptions);
            state.subscriptions = subscriptions;
        },
        setIsOrdering: (state, {payload: isOrdering}) => {
            state.isOrdering = isOrdering;
        },
    }
});

const fetchPoolInformation = (): Thunk => async dispatch => {
    try {
        const poolInformation = await poolService.fetchPoolInformation();
        dispatch(poolSlice.actions.setPool(poolInformation))
    } catch (err) {
        dispatch(applicationSlice.actions.showErrorMessage(err.toString()))
    }
};

const orderSubscription = (order: SubscriptionOrder): Thunk => async dispatch => {
    try {
        dispatch(poolSlice.actions.setIsOrdering(true));
        await poolService.commitSubscriptionOrder(order);
    } catch (err) {
        dispatch(applicationSlice.actions.showErrorMessage(err.toString()))
    } finally {
        dispatch(poolSlice.actions.setIsOrdering(false))
    }
};


const fetchSubscriptions = (onRequestFinished:OnEventFn<boolean> = voidFn): Thunk => async (dispatch, getState) => {
    try {
        const subscriptions = await poolService.fetchSubscriptions();
        dispatch(poolSlice.actions.setSubscriptions(subscriptions));
        onRequestFinished(true);
    } catch (err) {
        dispatch(applicationSlice.actions.showErrorMessage(err.toString()));
        onRequestFinished(false);
    } finally {
    }
};

const claimFreeSpace = (pin: string): Thunk => async dispatch => {
    try {
        dispatch(poolSlice.actions.setIsOrdering(true));
        await poolService.claimFreeSpace(pin);
        dispatch(accountSlice.actions.setClaimSpaceState(Tristate.Pending));
    } catch (err) {
        dispatch(applicationSlice.actions.showErrorMessage(err.message))
    } finally {
        dispatch(poolSlice.actions.setIsOrdering(false))
    }
};


export const poolThunks = {
    claimFreeSpace,
    fetchPoolInformation,
    fetchSubscriptions,
    orderSubscription,
};

