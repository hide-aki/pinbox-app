import {AppTransientState, AppTransientStatePaths} from '../appTransientStateStore';
import {messageSendServiceInstance} from '../../../../singletons';
import {IfsChangedMessage, NoSecretFoundMessage} from '../../../ipcMessaging/outgoing/providers';
import {getIfsPath} from '../../../internalFileStructure';
import {getIfsSecret} from '../../../internalFileStructure/getIfsSecret';
import {ErrorCodes} from '../../../exceptions';


export async function ifsListener(state: AppTransientState, path: string | null): Promise<void> {
    if (path !== AppTransientStatePaths.InternalFileStructure) return;

    const ifs = state.ifs;
    const publicKey = state.currentPublicKey;
    if (!publicKey) return;
    try {
        const secret = await getIfsSecret(publicKey);
        await ifs.saveToLocal(getIfsPath(publicKey), secret);
        messageSendServiceInstance().send(IfsChangedMessage());
    } catch (e) {
        if (e.code === ErrorCodes.NoSecret) {
            messageSendServiceInstance().send(NoSecretFoundMessage());
        }
        throw e
    }
}

