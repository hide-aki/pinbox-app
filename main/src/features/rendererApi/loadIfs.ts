import {InternalFileStructure} from '../internalFileStructure/InternalFileStructure';

export async function loadIfs(): Promise<object> {

    // // get publicKey from somewhere
    // const publicKey = 'publicKey';
    // const {ifs} = userStore.get(publicKey);
    // const internalFileStructure = await InternalFileStructure.loadFromIpfs(ifs, publicKey);
    // return internalFileStructure.data;

    return Promise.resolve({})
}
