// @ts-ignore

const isLeaf = (obj: TreeNode): boolean => obj.ipfsHash !== undefined;

export function fileTreeWalker(node: any,
                               visitorFn: (node: any, parent: any) => void,
                               shouldIgnoreNodeFn: (node: any) => boolean = () => false
) {
    Object.keys(node)
        .forEach(k => {
            // @ts-ignore
            const child = node[k];
            if (!(child && !shouldIgnoreNodeFn(child))) {
                return;
            }
            visitorFn(child, k === 'root' ? null : node);
            if (!isLeaf(child)) {
                fileTreeWalker(child, visitorFn, shouldIgnoreNodeFn)
            }
        })
}
