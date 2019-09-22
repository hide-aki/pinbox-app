import {encryptFileTo, decryptFileFrom} from '../fileCrypt';
import {join} from 'path';
import {unlinkSync, existsSync, readFileSync} from 'fs';

const resetFiles = (filePath:string) => {
    if (existsSync(filePath)) {
        unlinkSync(filePath);
    }
};

describe('fileCrypt', () => {
    it('should read encrypt and decrypt correctly', async () => {
        const secret = 'MySecret';

        const inputFilePath = join(__dirname, './testfile.txt');
        const outputFilePath = join(__dirname, './testfile_1.txt.enc');
        const decryptedOutputFilePath = join(__dirname, './testfile_1.txt.dec');
        resetFiles(outputFilePath);
        resetFiles(decryptedOutputFilePath);

        await encryptFileTo({
            secret,
            inputFilePath,
            outputFilePath,
        });

        await decryptFileFrom({
            secret,
            inputFilePath: outputFilePath,
            outputFilePath: decryptedOutputFilePath,
            });

        const decrypted = readFileSync(decryptedOutputFilePath);
        const original = readFileSync(inputFilePath);
        expect(original).toEqual(decrypted);

    });

});
