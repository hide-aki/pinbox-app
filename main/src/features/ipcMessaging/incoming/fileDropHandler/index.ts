import {fileWalk} from './fileWalk';
import {IfsChangedMessage} from '../../outgoing/providers';
import {messageSendServiceInstance} from '../../../../globals';
import {FileRecord} from '../../../internalFileStructure/FileRecord';
import {mountInternalFilePath} from './mountInternalFilePath';
import {addFileToInternalFileStructure} from './addFileToInternalFileStructure';
import {addToIpfs} from './addToIpfs';

const handleFile = (nodePath: string) => async (file: string, depth: number): Promise<void> => {
    const ipfsHash = await addToIpfs(file);
    const internalFilePath = mountInternalFilePath(nodePath, file, depth);
    const ifsFilePath = addFileToInternalFileStructure(new FileRecord(internalFilePath, ipfsHash));
    messageSendServiceInstance().send(IfsChangedMessage(ifsFilePath));
};

export const handleFileDrop = (payload: any) => {
    const {filePaths, nodePath} = payload;
    filePaths.forEach((file: string) => {
        fileWalk(file, handleFile(nodePath))
    });
};
