import {IfsData} from '../../sharedTypings/IfsData';
import {getIfsPath, InternalFileStructure} from '../internalFileStructure';

export async function loadIfs(publicKey: string): Promise<IfsData> {
    let internalFileStructure: InternalFileStructure;
    try {
        internalFileStructure = await InternalFileStructure.loadFromLocal(getIfsPath(publicKey));
        return internalFileStructure.data
    } catch (e) {
        const internalFileStructure = new InternalFileStructure();
        await internalFileStructure.saveToLocal(getIfsPath(publicKey));
        return internalFileStructure.data
    }
}
