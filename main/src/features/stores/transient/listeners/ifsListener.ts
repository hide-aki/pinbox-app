import {AppTransientState, AppTransientStatePaths} from '../appTransientStateStore';
import {messageSendServiceInstance} from '../../../../singletons';
import {IfsChangedMessage, NoSecretFoundMessage} from '../../../ipcMessaging/outgoing/providers';
import {getIfsPath} from '../../../internalFileStructure';
import {getIfsSecret} from '../../../internalFileStructure/getIfsSecret';
import {NoSecretError} from '../../../exceptions';

let timeout: NodeJS.Timeout | null = null;

export function ifsListener(state: AppTransientState, path: string | null): void {
    if (path !== AppTransientStatePaths.InternalFileStructure) return;

    const ifs = state.ifs;
    const publicKey = state.currentPublicKey;
    if (!publicKey) return;
    if (timeout) {
        clearTimeout(timeout);
    }

    timeout = setTimeout(async () => {
        try {
            const secret = await getIfsSecret(publicKey);
            await ifs.saveToLocal(getIfsPath(publicKey), secret);
            messageSendServiceInstance().send(IfsChangedMessage());
        } catch (e) {
            if (e instanceof NoSecretError) {
                messageSendServiceInstance().send(NoSecretFoundMessage());
            }
            throw e
        } finally {

            timeout = null
        }
    }, 250);
}

