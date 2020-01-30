import {IfsData} from '../../sharedTypings/IfsData';
import {getIfsPath, InternalFileStructure} from '../internalFileStructure';
import {getIfsSecret} from '../internalFileStructure/getIfsSecret';

// NOTE: you cannot use MAIN Thread objects herein, as it will be executed in the RENDERER Thread

export async function loadIfs(publicKey: string): Promise<IfsData> {
    const secret = await getIfsSecret(publicKey);
    const fileStructure = await InternalFileStructure.loadFromLocal(getIfsPath(publicKey), secret);
    return fileStructure.data
}
