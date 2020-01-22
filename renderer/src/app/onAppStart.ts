import {EnhancedStore} from '@reduxjs/toolkit';
import * as pools from '../features/pools/slice'
import * as account from '../features/account/slice'

export async function onAppStart(store: EnhancedStore) {
    // @ts-ignore
    store.dispatch(pools.thunks.fetchAvailablePools());
    // @ts-ignore
    store.dispatch(account.thunks.fetchBurstAccountInfo());
}
