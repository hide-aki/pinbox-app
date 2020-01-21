import {MockedFileTree} from './mockedFileTree';
import {jsonToNavigableJson} from '../jsonToNavigableJson';

describe('jsonToNavigableJson', () => {
    it('should add parent props to permit upwards navigation', () => {
        const navigableTree = jsonToNavigableJson(MockedFileTree);
        // @ts-ignore
        const root = navigableTree.root;
        // @ts-ignore
        expect(root['some path'].deeperPath._parent).toEqual(root['some path']);
        expect(root._parent).toBeNull();
    });
});
