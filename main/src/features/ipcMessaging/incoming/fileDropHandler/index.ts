import {fileWalk} from './fileWalk';
import {IfsChangedMessage} from '../../outgoing/providers';
import {currentPublicKeyInstance, messageSendServiceInstance} from '../../../../globals';
import {FileRecord} from '../../../internalFileStructure/FileRecord';
import {mountInternalFilePath} from './mountInternalFilePath';
import {addToIpfs} from './addToIpfs';
import {IpcMessageTypeFileDrop} from '../../../../sharedTypings/IpcMessageTypeFileDrop';
import {getIfsPath, InternalFileStructure, withInternalFileStructure} from '../../../internalFileStructure';

const addFile = (nodePath: string, ifs: InternalFileStructure) => async (file: string, depth: number): Promise<void> => {
    const internalFilePath = mountInternalFilePath(nodePath, file, depth);
    const fileRecord = new FileRecord(internalFilePath, null);
    const ipfsHash = await addToIpfs(file, fileRecord.nonce);
    ifs.upsertFileRecord(new FileRecord(internalFilePath, ipfsHash));
    await ifs.saveToLocal(getIfsPath(currentPublicKeyInstance()));
    messageSendServiceInstance().send(IfsChangedMessage());
};

export const handleFileDrop = async (payload: IpcMessageTypeFileDrop): Promise<void> => {
    withInternalFileStructure((ifs) => {
        const {filePaths, ifsFilepath} = payload;
        const addFileFn = addFile(ifsFilepath, ifs);
        filePaths.forEach((file: string) => {
            fileWalk(file, addFileFn)
        });
    });
};
