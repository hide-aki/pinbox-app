import {IpcMessageTypeRenameFile} from '../../../../sharedTypings/IpcMessageTypeRenameFile';
import {InternalFileStructureMutator} from '../../../internalFileStructure/InternalFileStructureMutator';
import {withInternalFileStructure} from '../../../internalFileStructure/withInternalFileStructure';
import {messageSendServiceInstance} from '../../../../globals';
import {IfsChangedMessage} from '../../outgoing/providers';

export const handleRenameFile = (
    payload: IpcMessageTypeRenameFile
) => {
    withInternalFileStructure((ifsData, saveIfsFn) => {
        const {newName, ifsFilepath} = payload;
        const fileStructure = new InternalFileStructureMutator(ifsData);
        fileStructure.renameFile(ifsFilepath, newName);
        saveIfsFn(fileStructure.data);
        messageSendServiceInstance().send(IfsChangedMessage());
    })
};
