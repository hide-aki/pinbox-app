import {EnhancedStore, AnyAction} from 'redux-starter-kit';
import * as pools from '../features/pools/slice'
import * as account from '../features/account/slice'

export async function onAppStart(store: EnhancedStore<any, AnyAction>) {
    store.dispatch(pools.thunks.fetchAvailablePools());
    store.dispatch(account.thunks.fetchBurstAccountInfo());
}
