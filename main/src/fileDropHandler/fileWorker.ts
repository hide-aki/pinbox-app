import * as workerpool from 'workerpool';
import {encryptFileTo, decryptFileFrom} from './fileCrypt'

const test = async () => {
    return Promise.resolve('bla blubb')
};

workerpool.worker({
    test,
    encryptFileTo,
    decryptFileFrom,
});
