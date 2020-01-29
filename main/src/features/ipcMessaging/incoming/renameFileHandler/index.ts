import {IpcMessageTypeRenameFile} from '../../../../sharedTypings/IpcMessageTypeRenameFile';
import {getIfsPath, withInternalFileStructure} from '../../../internalFileStructure';
import {messageSendServiceInstance} from '../../../../globals';
import {IfsChangedMessage} from '../../outgoing/providers';
import {selectCurrentPublicKey} from '../../../stores/transient/selectors';

export const handleRenameFile = async (
    payload: IpcMessageTypeRenameFile
): Promise<void> => {
    await withInternalFileStructure((ifs) => {
        const {newName, ifsFilepath} = payload;
        ifs.renameFileRecord(ifsFilepath, newName);
        ifs.saveToLocal(getIfsPath(selectCurrentPublicKey()));
        messageSendServiceInstance().send(IfsChangedMessage());
    })
};
