import {mountInternalFilePath} from '../mountInternalFilePath';

describe('mountInternalFilePath', () => {
    const ifsPath = '/1/2/a';

    it('should mount path correctly - posix', () => {
        const posixFileName = '/a/b/c/d/foo.png';
        let result = mountInternalFilePath(ifsPath, posixFileName, 0);
        expect(result).toBe('/1/2/a/foo.png');
        result = mountInternalFilePath(ifsPath, posixFileName, 1);
        expect(result).toBe('/1/2/a/d/foo.png');
        result = mountInternalFilePath(ifsPath, posixFileName, 2);
        expect(result).toBe('/1/2/a/c/d/foo.png');
        result = mountInternalFilePath(ifsPath, posixFileName, 3);
        expect(result).toBe('/1/2/a/b/c/d/foo.png');
    });

    it('should mount path correctly - win', async () => {
        const winFileName = 'c:\\a\\b\\c\\d\\foo.png';
        let result = mountInternalFilePath(ifsPath, winFileName, 0);
        expect(result).toBe('/1/2/a/foo.png');
        result = mountInternalFilePath(ifsPath, winFileName, 1);
        expect(result).toBe('/1/2/a/d/foo.png');
        result = mountInternalFilePath(ifsPath, winFileName, 2);
        expect(result).toBe('/1/2/a/c/d/foo.png');
        result = mountInternalFilePath(ifsPath, winFileName, 3);
        expect(result).toBe('/1/2/a/b/c/d/foo.png');

    });
});
