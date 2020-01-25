import {applicationSlice} from '../../../../app/slice'
import {IpcMessageTypeIpfsReady} from '../../../../../../main/src/sharedTypings/IpcMessageTypeIpfsReady';
import {store} from '../../../../app/store';

export const handleIpfsReady = (payload:IpcMessageTypeIpfsReady) => {
    // TODO: see whether we can monitor the ipfs state....maybe connect with network status
    store.dispatch(applicationSlice.actions.updateIpfsStatus(true))
};
