import {fileWalk} from './fileWalk';
import {IfsChangedMessage} from '../../outgoing/providers';
import {messageSendServiceInstance} from '../../../../globals';
import {FileRecord} from '../../../internalFileStructure/FileRecord';
import {mountInternalFilePath} from './mountInternalFilePath';
import {updateInternalFileSystem} from './updateInternalFileSystem';
import {addToIpfs} from './addToIpfs';
import {IpcMessageTypeFileDrop} from '../../../../sharedTypings/IpcMessageTypeFileDrop';

const addFile = (nodePath: string) => async (file: string, depth: number): Promise<void> => {
    const internalFilePath = mountInternalFilePath(nodePath, file, depth);
    const fileRecord = new FileRecord(internalFilePath, null);
    updateInternalFileSystem(fileRecord);
    messageSendServiceInstance().send(IfsChangedMessage());
    addToIpfs(file, fileRecord.nonce)
        .then(ipfsHash => {
            updateInternalFileSystem(new FileRecord(internalFilePath, ipfsHash));
            messageSendServiceInstance().send(IfsChangedMessage());
        }).catch(() => {
        messageSendServiceInstance().sendErrorMessage(new Error('IPFS has a severe problem. Try to reopen Pinbox.'))
    });
};

export const handleFileDrop = (payload: IpcMessageTypeFileDrop) => {
    const {filePaths, ifsFilepath} = payload;
    const addFileFn = addFile(ifsFilepath);
    filePaths.forEach((file: string) => {
        fileWalk(file, addFileFn)
    });
};
