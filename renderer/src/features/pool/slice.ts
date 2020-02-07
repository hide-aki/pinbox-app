import {createSlice, Action} from '@reduxjs/toolkit';
import {applicationSlice} from '../../app/slice';
import {PoolService} from '../../services/PoolService';
import {Thunk} from '../../typings/Thunk';
import {SubscriptionOrder} from '../../typings/SubscriptionOrder';

const poolService = new PoolService();

export const poolSlice = createSlice({
    name: 'pool',
    initialState: {
        info: poolService.getPoolInfo(),
        isOrdering: false,
        subscriptions: [],
    },
    reducers: {
        setPool: (state, {payload: poolInfo}) => {
            poolService.storePoolInfo(poolInfo);
            state.info = poolInfo;
        },
        setSubscriptions: (state, {payload: subscriptions}) => {
            state.subscriptions = subscriptions;
        },
        setIsOrdering: (state, {payload: isOrdering}) => {
            state.isOrdering = isOrdering;
        }
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
        // TODO: what parameters
        await poolService.commitSubscriptionOrder(order);
    } catch (err) {
        dispatch(applicationSlice.actions.showErrorMessage(err.toString()))
    }finally {
        dispatch(poolSlice.actions.setIsOrdering(false))
    }
};


export const thunks = {
    fetchPoolInformation,
    orderSubscription
};

