export function getNodePath(node: object): string {
    console.log('getNodePath', node)
    const pathNames: string[] = [];
    let n = node;
    while (n) {
        // @ts-ignore
        const parent = n.__parent;
        if (!parent) break;
        const pNames = Object.getOwnPropertyNames(parent);
        for (let i = 0; i < pNames.length; ++i) {
            if (parent[pNames[i]] === n) {
                pathNames.unshift(pNames[i]);
                break;
            }
        }
        n = parent
    }
    return pathNames.join('/');
}
