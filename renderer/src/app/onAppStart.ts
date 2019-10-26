import {EnhancedStore, AnyAction} from 'redux-starter-kit';
import {thunks} from '../features/pools/slice'

export async function onAppStart(store: EnhancedStore<any, AnyAction>) {
    store.dispatch(thunks.fetchAvailablePools())
}
