import {EnhancedStore} from '@reduxjs/toolkit';
import * as pool from '../features/pool/slice'
import * as account from '../features/account/slice'

export async function onAppStart(store: EnhancedStore) {
    // @ts-ignore
    store.dispatch(account.thunks.fetchBurstAccountInfo());
    // @ts-ignore
    store.dispatch(pool.thunks.fetchPoolInformation());
}
