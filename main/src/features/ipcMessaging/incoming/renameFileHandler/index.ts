import {IpcMessageTypeRenameFile} from '../../../../sharedTypings/IpcMessageTypeRenameFile';
import {withInternalFileStructure} from '../../../internalFileStructure';
import {AppTransientStatePaths, appTransientStateStore} from '../../../stores/transient/appTransientStateStore';

export const handleRenameFile = async (
    payload: IpcMessageTypeRenameFile
): Promise<void> => {
    await withInternalFileStructure((ifs) => {
        const {newName, ifsFilepath} = payload;
        ifs.renameFileRecord(ifsFilepath, newName);
        appTransientStateStore.set(AppTransientStatePaths.InternalFileStructure, ifs)
    })
};
