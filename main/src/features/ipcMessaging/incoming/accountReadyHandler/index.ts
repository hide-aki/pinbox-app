import {IpcMessageTypeAccountReady} from '../../../../sharedTypings/IpcMessageTypeAccountReady';
import {logger} from '../../../logger';
import {AppTransientStatePaths, appTransientStateStore} from '../../../stores/transient/appTransientStateStore';

export const handleAccountReady = (
    payload: IpcMessageTypeAccountReady
) => {
    const {publicKey} = payload;
    logger.debug(`Account ready: ${publicKey}`);
    appTransientStateStore.set(AppTransientStatePaths.CurrentPublicKey, publicKey)
};
