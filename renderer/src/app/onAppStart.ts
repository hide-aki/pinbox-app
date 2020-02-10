import {EnhancedStore} from '@reduxjs/toolkit';
import * as pool from '../features/pool/slice'
import * as account from '../features/account/slice'
import {PollingTime} from '../utils/constants';

export async function onAppStart(store: EnhancedStore) {
    const pollableCode = () => {
        // @ts-ignore
        store.dispatch(account.thunks.fetchBurstAccountInfo());
        // @ts-ignore
        store.dispatch(pool.thunks.fetchPoolInformation());
    };

    pollableCode();
    setInterval(pollableCode, PollingTime)
}
