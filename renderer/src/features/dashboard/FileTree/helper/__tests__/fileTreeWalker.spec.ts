import {fileTreeWalker} from '../fileTreeWalker';
import {MockedFileTree} from './mockedFileTree';

describe('fileTreeWalker', () => {
    it('should walk through tree and calls applied functions', () => {
        const visitor = jest.fn();
        fileTreeWalker(MockedFileTree, visitor);
        expect(visitor).toHaveBeenCalledTimes(9);
    })
});
