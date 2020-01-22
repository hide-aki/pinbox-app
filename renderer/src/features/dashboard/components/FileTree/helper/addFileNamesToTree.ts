function assertUniqueFilenames(node: object, fileNames: string[]): void {
    fileNames.forEach(fileName => {
        if (Object.getOwnPropertyNames(node).indexOf(fileName) !== -1)
            throw new Error(`Duplicate Filename: ${fileName}`)
    })
}

export function addFileNamesToTree(tree: object, nodePath: string, fileNames: string[]): object {
    const parts = nodePath.split('/');
    // @ts-ignore
    let n = tree.root ? tree.root : tree;
    while (parts.length) {
        const part = parts.shift();
        // @ts-ignore
        n = n[part]
    }

    assertUniqueFilenames(n, fileNames);

    fileNames.forEach(fileName => {
        n[fileName] = {ipfsHash: ''}
    });

    return tree;
}
