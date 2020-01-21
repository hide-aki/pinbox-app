import {fileTreeWalker} from './fileTreeWalker';
import {shouldIgnoreParentNode} from './shoudlIgnoreParentNode';

/**
 * Converts a JSON object into a navigable JSON, i.e. adds props like `_parent` for navigation
 * @param tree The tree to be adjusted (note: the tree will be mutated)
 * @return The _tree_ with additional props. Attention: The Json contains circular references now
 */
export const jsonToNavigableJson = (tree: object): object => {
    fileTreeWalker(tree,
        (node, parent) => {
            if(node) node._parent = parent
        },
        shouldIgnoreParentNode
    );
    return tree;
};
