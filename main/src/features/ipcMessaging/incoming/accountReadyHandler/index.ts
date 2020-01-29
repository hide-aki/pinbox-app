import {IpcMessageTypeAccountReady} from '../../../../sharedTypings/IpcMessageTypeAccountReady';
import {logger} from '../../../logger';

export const handleAccountReady = (
    payload: IpcMessageTypeAccountReady
) => {
    const {publicKey} = payload;
    logger.debug(`Account ready: ${publicKey}`);
    // @ts-ignore
    global.currentPublicKey = publicKey;
};
