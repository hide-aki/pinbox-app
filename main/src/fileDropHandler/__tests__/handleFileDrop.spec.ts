import {join} from 'path';
import {unlinkSync, existsSync} from 'fs';
import {__handleFile} from '../index';

const resetFiles = (filePath: string) => {
    if (existsSync(filePath)) {
        unlinkSync(filePath);
    }
};

describe('handleFileDrop', () => {
    it('should encrypt a file in a worker', async () => {
        const secret = 'MySecret';

        const inputFilePath = join(__dirname, './testfile.txt');
        const outputFilePath = join(__dirname, './testfile_1.txt.enc');
        resetFiles(outputFilePath);

        await __handleFile(inputFilePath);
    });

});
