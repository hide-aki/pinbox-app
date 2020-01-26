import {withIpfs} from '../../../ipfs/withIpfs';
import {FileCryptArgs} from '../../../cryptography/fileCrypt';
import {dirname, join} from "path";
import {randomString} from '../../../../util/randomString';
import {logger} from '../../../logger';
import {handleException} from '../../../exceptions';

export const addToIpfs = async (file: string): Promise<string> => withIpfs(async (ipfs: any): Promise<string> => {
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
