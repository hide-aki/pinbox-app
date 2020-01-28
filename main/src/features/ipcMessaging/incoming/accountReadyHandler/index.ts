import {IpcMessageTypeAccountReady} from '../../../../sharedTypings/IpcMessageTypeAccountReady';

export const handleAccountReady = (
    payload: IpcMessageTypeAccountReady
) => {
    console.log('handleAccountReady', payload.publicKey)
};
