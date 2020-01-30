import {AppTransientState, AppTransientStatePaths, appTransientStateStore} from '../appTransientStateStore';
import {messageSendServiceInstance} from '../../../../globals';
import {IfsChangedMessage} from '../../../ipcMessaging/outgoing/providers';
import {getIfsPath, InternalFileStructure} from '../../../internalFileStructure';

export function currentPublicKeyListener(state: AppTransientState, path: string | null): void {
    if (path !== AppTransientStatePaths.CurrentPublicKey) return;

    const publicKey = state.currentPublicKey;
    if (!(publicKey)) return;
    InternalFileStructure.loadFromLocal(getIfsPath(publicKey)).then(ifs => {
        appTransientStateStore.set(AppTransientStatePaths.InternalFileStructure, ifs);
    })
}

