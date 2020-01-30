import {AppTransientState, AppTransientStatePaths} from '../appTransientStateStore';
import {messageSendServiceInstance} from '../../../../globals';
import {IfsChangedMessage} from '../../../ipcMessaging/outgoing/providers';
import {getIfsPath} from '../../../internalFileStructure';

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
        await ifs.saveToLocal(getIfsPath(publicKey));
        messageSendServiceInstance().send(IfsChangedMessage());
        timeout = null
    }, 250);
}

