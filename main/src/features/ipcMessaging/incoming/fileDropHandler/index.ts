import {fileWalk} from './fileWalk';
import {IfsChangedMessage} from '../../outgoing/providers';
import {messageSendServiceInstance} from '../../../../globals';
import {FileRecord} from '../../../internalFileStructure/FileRecord';
import {mountInternalFilePath} from './mountInternalFilePath';
import {addFileToInternalFileStructure} from './addFileToInternalFileStructure';
import {addToIpfs} from './addToIpfs';
import {IpcMessageTypeFileDrop} from '../../../../sharedTypings/IpcMessageTypeFileDrop';

const addFile = (nodePath: string) => async (file: string, depth: number): Promise<void> => {
    const ipfsHash = await addToIpfs(file);
    const internalFilePath = mountInternalFilePath(nodePath, file, depth);
    addFileToInternalFileStructure(new FileRecord(internalFilePath, ipfsHash));
    messageSendServiceInstance().send(IfsChangedMessage());
};

export const handleFileDrop = (payload: IpcMessageTypeFileDrop) => {
    const {filePaths, ifsFilepath} = payload;
    const addFileFn  = addFile(ifsFilepath);
    filePaths.forEach((file: string) => {
        fileWalk(file, addFileFn)
    });
};
