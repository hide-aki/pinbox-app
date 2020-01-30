import {IfsData} from '../../sharedTypings/IfsData';
import {getIfsPath, InternalFileStructure} from '../internalFileStructure';

export async function loadIfs(publicKey: string): Promise<IfsData> {
     const fileStructure = await InternalFileStructure.loadFromLocal(getIfsPath(publicKey));
    return fileStructure.data
}
