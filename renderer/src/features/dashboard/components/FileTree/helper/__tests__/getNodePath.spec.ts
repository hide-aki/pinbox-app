import {MockedFileTree} from './mockedFileTree';
import {jsonToNavigableJson} from '../jsonToNavigableJson';
import {getNodePath} from '../getNodePath';

describe('getNodePath', () => {
    const navigableTree = jsonToNavigableJson(MockedFileTree);
    // @ts-ignore
    const root = navigableTree.root;
    it('should get node path from various nodes', () => {
        // @ts-ignore
        let path = getNodePath(root['some path'].deeperPath);
        expect(path).toEqual('some path/deeperPath');
        path = getNodePath(root['some path'].deeperPath['file1.txt']);
        expect(path).toEqual('some path/deeperPath/file1.txt');
    });
    it('should get empty string for root path', () => {
        const path = getNodePath(root);
        expect(path).toBe('');
    });
});
