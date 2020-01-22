import {fileTreeWalker} from './fileTreeWalker';

const ignoreParentNode = (node: any) : boolean =>  node && node.__parent;

/**
 * Converts a JSON object into a navigable JSON, i.e. adds props like `_parent` for navigation
 * @param tree The tree to be adjusted (note: the tree will be mutated)
 * @return The _tree_ with additional props. Attention: The Json contains circular references now
 */
export const jsonToNavigableJson = (tree: object): object => {
    fileTreeWalker(tree,
        (node, parent) => {
            // @ts-ignore
            if(node && node !== tree.root) node.__parent = parent
        },
        ignoreParentNode
    );
    return tree;
};
