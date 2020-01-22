import {MockedFileTree} from './mockedFileTree';
import {addFileNamesToTree} from '../addFileNamesToTree';

describe('addFilesToTree', () => {
    it('should add files under existing path', () => {
        const root = MockedFileTree.root;
        const tree = addFileNamesToTree(root, 'some path/deeperPath', ['test1.txt', 'test2.txt']);
        const expectedFileObject = {ipfsHash: ''};
        // @ts-ignore
        expect(tree['some path'].deeperPath['test1.txt']).toEqual(expectedFileObject);
        // @ts-ignore
        expect(tree['some path'].deeperPath['test2.txt']).toEqual(expectedFileObject);
    });

    it('should throw exception on duplicate files', () => {
        const root = MockedFileTree.root;
        try {
            addFileNamesToTree(root, 'some path/deeperPath', ['file1.txt', 'file2.txt']);
            expect("Expected exception").toBeFalsy()
        } catch (e) {
            expect(e.message).toContain('Duplicate Filename: file1.txt')
        }
    });
});
