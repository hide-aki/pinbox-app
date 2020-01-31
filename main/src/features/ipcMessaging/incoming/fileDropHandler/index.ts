import {fileWalk} from './fileWalk';
import {FileRecord} from '../../../internalFileStructure/FileRecord';
import {mountInternalFilePath} from './mountInternalFilePath';
import {addToIpfs} from './addToIpfs';
import {IpcMessageTypeFileDrop} from '../../../../sharedTypings/IpcMessageTypeFileDrop';
import {InternalFileStructure, withInternalFileStructure} from '../../../internalFileStructure';
import {AppTransientStatePaths, appTransientStateStore} from '../../../stores/transient/appTransientStateStore';

const addFile = (nodePath: string, ifs: InternalFileStructure) => async (file: string, depth: number): Promise<void> => {
    const internalFilePath = mountInternalFilePath(nodePath, file, depth);
    const fileRecord = new FileRecord(internalFilePath, null);
    const ipfsHash = await addToIpfs(file, fileRecord.nonce);
    ifs.upsertFileRecord(new FileRecord(internalFilePath, ipfsHash));
};

export const handleFileDrop = (payload: IpcMessageTypeFileDrop): void => {
    withInternalFileStructure(async (ifs) => {
        const {filePaths, ifsFilepath} = payload;
        const addFileFn = addFile(ifsFilepath, ifs);
        filePaths.forEach((file, index) => {
            fileWalk(file, addFileFn).then( _ =>{
                if(index === filePaths.length - 1){
                    appTransientStateStore.set(AppTransientStatePaths.InternalFileStructure, ifs);
                }
            })
        });
    });
};
