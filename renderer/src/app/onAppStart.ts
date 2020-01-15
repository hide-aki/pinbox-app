import {EnhancedStore} from '@reduxjs/toolkit';
import * as pools from '../features/pools/slice'
import * as account from '../features/account/slice'

export async function onAppStart(store: EnhancedStore) {
    store.dispatch(pools.thunks.fetchAvailablePools());
    store.dispatch(account.thunks.fetchBurstAccountInfo());
}
