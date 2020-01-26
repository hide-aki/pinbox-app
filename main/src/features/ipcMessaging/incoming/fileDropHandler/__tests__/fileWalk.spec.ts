import {fileWalk} from '../fileWalk';
import {join} from 'path';

describe('fileWalk', () => {
    it('calls callback for single file correctly', async () => {
        const testFile = join(__dirname, '/testFiles/testfile.txt');
        const walker = jest.fn();
        await fileWalk(testFile, walker);
        expect(walker).toHaveBeenCalledTimes(1);
    });

    it('calls callback for single directory recursively', async () => {
        const testFile = join(__dirname, '/testFiles');
        const walker = jest.fn();
        await fileWalk(testFile, (file) => {
            walker(file)
        });
        expect(walker).toHaveBeenCalledTimes(4);
    })
});
