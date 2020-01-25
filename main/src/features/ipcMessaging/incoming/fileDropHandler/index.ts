import {FileCryptArgs} from '../../../cryptography/fileCrypt';
import {withIpfs} from '../../../ipfs/withIpfs';
import {logger} from '../../../logger';
import {randomString} from '../../../../util/randomString';
import {dirname, join} from 'path';
import {fileWalk} from './fileWalk';
import {handleException} from '../../../exceptions';
import {IfsChangedMessage} from '../../outgoing/providers';
import {appStoreInstance, messageSendServiceInstance} from '../../../../globals';
import {InternalFileStructure} from '../../../internalFileStructure/InternalFileStructure';
import {FileRecord} from '../../../internalFileStructure/FileRecord';
import * as path from 'path';

const updateIFS = (fileRecord: FileRecord): string => {
    let appStore = appStoreInstance();
    let ifs = appStore.get('ifs');
    const fileStructure = new InternalFileStructure(ifs);
    fileStructure.addFileRecord(fileRecord);
    appStore.set('ifs', fileStructure.data);
    return appStore.path
};

const updateIPFS = async (file: string): Promise<string> => withIpfs(async (ipfs: any): Promise<string> => {
    const args: FileCryptArgs = {
        // TODO: use derived secret
        secret: 'MySecretT',
        inputFilePath: file,
        // TODO: use apps path
        outputFilePath: join(dirname(file), randomString())
    };
    try {
        // await encryptFileTo(args);
        logger.debug(`Adding file: ${args.inputFilePath}`);
        // const result = await ipfs.addFromFs(args.outputFilePath);
        const result = 'mockedIpfsHash';
        logger.debug(`Added file: ${args.outputFilePath}, Ipfs: ${JSON.stringify(result)}`);
        // fs.unlinkSync(args.outputFilePath);
        return Promise.resolve(result)
    } catch (e) {
        handleException(e);
        return Promise.reject(e)
    }
});

const mountInternalFilePath = (ifsNodePath:string, file: string, depth: number) : string => {
    const fileName = path.basename(file);
    let dirPath = path.dirname(file);
    const dirPathParts = dirPath.split('/');
    dirPath = dirPathParts.slice(dirPathParts.length - depth).join('/');
    return path.join(ifsNodePath, dirPath, fileName);
};

const handleFile = (ifsNodePath: string) => (file: string, depth: number): void => {
    // const ipfsHash = await updateIPFS(file);
    const ipfsHash = 'MockedHash';
    const nodePath = mountInternalFilePath(ifsNodePath, file, depth)
    const ifsFilePath = updateIFS(new FileRecord(nodePath, ipfsHash));
     messageSendServiceInstance().send(IfsChangedMessage(ifsFilePath));
};

export const handleFileDrop = (payload: any) => {
    const {filePaths, nodePath} = payload;
    filePaths.forEach((file: string) => {
        fileWalk(file, handleFile(nodePath))
    });
};
