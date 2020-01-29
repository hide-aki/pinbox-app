import {IpcMessageTypeRenameFile} from '../../../../sharedTypings/IpcMessageTypeRenameFile';
import {withInternalFileStructure} from '../../../internalFileStructure/withInternalFileStructure';
import {currentPublicKeyInstance, messageSendServiceInstance} from '../../../../globals';
import {IfsChangedMessage} from '../../outgoing/providers';
import {getIfsPath} from '../../../internalFileStructure/getIfsPath';

export const handleRenameFile = async (
    payload: IpcMessageTypeRenameFile
): Promise<void> => {
    await withInternalFileStructure((ifs) => {
        const {newName, ifsFilepath} = payload;
        ifs.renameFileRecord(ifsFilepath, newName);
        ifs.saveToLocal(getIfsPath(currentPublicKeyInstance()));
        messageSendServiceInstance().send(IfsChangedMessage());
    })
};
