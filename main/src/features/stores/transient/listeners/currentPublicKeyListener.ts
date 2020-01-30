import {AppTransientState, AppTransientStatePaths, appTransientStateStore} from '../appTransientStateStore';
import {getIfsPath, InternalFileStructure} from '../../../internalFileStructure';
import {logger} from '../../../logger';
import {getIfsSecret} from '../../../internalFileStructure/getIfsSecret';
import {ErrorCodes, NoSecretError} from '../../../exceptions';
import {messageSendServiceInstance} from '../../../../singletons';
import {NoSecretFoundMessage} from '../../../ipcMessaging/outgoing/providers';

export async function currentPublicKeyListener(state: AppTransientState, path: string | null): Promise<void> {
    if (path !== AppTransientStatePaths.CurrentPublicKey) return;

    const publicKey = state.currentPublicKey;
    if (!(publicKey)) return;

    const ifsLocalFilePath = getIfsPath(publicKey);

    let ifs: InternalFileStructure;
    try{
        logger.debug(`Try loading IFS from ${ifsLocalFilePath}`);
        const secret = await getIfsSecret(publicKey);
        ifs = await InternalFileStructure.loadFromLocal(ifsLocalFilePath, secret)
    }catch(e){
        logger.debug(`Load failed: ${e.message}`);
        if(e.code === ErrorCodes.NoSecret){
            messageSendServiceInstance().send(NoSecretFoundMessage())
        }
        logger.debug('Creating New IFS');
        // TODO: Try to find in ipfs first, otherwise create new
        ifs = new InternalFileStructure()
    }
    appTransientStateStore.set(AppTransientStatePaths.InternalFileStructure, ifs);
}

