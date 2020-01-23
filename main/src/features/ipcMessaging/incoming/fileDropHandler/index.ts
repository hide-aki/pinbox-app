import {FileCryptArgs} from '../../../cryptography/fileCrypt';
import {withIpfs} from '../../../ipfs/withIpfs';
import {logger} from '../../../logger';
import {randomString} from '../../../../util/randomString';
import {dirname, join} from 'path';
import {fileWalk} from './fileWalk';
import {handleException} from '../../../exceptions';
import {MessageSendService} from '../../outgoing';
import {IfsUpdatedMessage} from '../../outgoing/providers';
import {internalFileStructureInstance} from '../../../../globals';

const updateIFS = async (data: any): Promise<string> => {
    const ifs = internalFileStructureInstance();

    // TODO: implement me!

    return Promise.resolve(ifs.filePath)
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
        const result = 'bla';
        logger.debug(`Added file: ${args.outputFilePath}, Ipfs: ${JSON.stringify(result)}`);
        // fs.unlinkSync(args.outputFilePath);
        return Promise.resolve(result)
    } catch (e) {
        handleException(e);
        return Promise.reject(e)
    }
});

const handleFile = (ifsNodePath: string) => async (file: string): Promise<void> => {
    const ipfsHash = await updateIPFS(file);

    console.log('ipfsHash', ipfsHash)

    const ifsFilePath = await updateIFS({ifsNodePath, file, ipfsHash});

    // @ts-ignore
    const messageService: MessageSendService = global.messageSendService;
    messageService.send(IfsUpdatedMessage(ifsFilePath))

};

export const handleFileDrop = (payload: any) => {
    const {filePaths, nodePath} = payload;
    filePaths.forEach((file: string) => {
        fileWalk(file, handleFile(nodePath))
    });
};
