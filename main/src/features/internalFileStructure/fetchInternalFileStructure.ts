import {InternalFileStructure} from './InternalFileStructure';
import {getIfsPath} from './getIfsPath';
import {existsSync} from "fs";
import {logger} from '../logger';
import {selectInternalFileStructure} from '../stores/transient/selectors';

export async function fetchInternalFileStructure(publicKey: string): Promise<InternalFileStructure> {
    let ifs = selectInternalFileStructure();
    ifs = new InternalFileStructure();
    const ifsLocalFilePath = getIfsPath(publicKey);
    if (existsSync(ifsLocalFilePath)) {
        logger.debug(`Loading IFS: ${ifsLocalFilePath}`);
        ifs = await InternalFileStructure.loadFromLocal(ifsLocalFilePath)
    } else {
        logger.debug(`Create new IFS`);
        ifs = new InternalFileStructure()
    }
    logger.debug('IFS initialized');
    return ifs
}
