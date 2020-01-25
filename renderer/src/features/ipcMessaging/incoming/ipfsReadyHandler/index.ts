import {IpcMessageTypeIpfsReady} from '../../../../../../main/src/sharedTypings/IpcMessageTypeIpfsReady';

export const handleIpfsReady = (payload:IpcMessageTypeIpfsReady) => {
    console.log('handleIpfsReady', payload)
};
