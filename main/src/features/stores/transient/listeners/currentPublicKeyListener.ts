import {AppTransientState, AppTransientStatePaths, appTransientStateStore} from '../appTransientStateStore';
import {getIfsPath, InternalFileStructure} from '../../../internalFileStructure';
import {logger} from '../../../logger';

export async function currentPublicKeyListener(state: AppTransientState, path: string | null): Promise<void> {
    if (path !== AppTransientStatePaths.CurrentPublicKey) return;

    const publicKey = state.currentPublicKey;
    if (!(publicKey)) return;

    const ifsLocalFilePath = getIfsPath(publicKey);

    let ifs: InternalFileStructure;
    try{
        logger.debug(`Try loading IFS from ${ifsLocalFilePath}`);
        ifs = await InternalFileStructure.loadFromLocal(ifsLocalFilePath)
    }catch(e){
        logger.debug(`Load failed - Create new IFS`);
        // TODO: Try to find in ipfs first, otherwise create new
        ifs = new InternalFileStructure()
    }
    appTransientStateStore.set(AppTransientStatePaths.InternalFileStructure, ifs);
}

