function assertUniqueFilenames(node: object, fileNames: string[]): void {
    fileNames.forEach(fileName => {
        if (Object.getOwnPropertyNames(node).indexOf(fileName) !== -1)
            throw new Error(`Duplicate Filename: ${fileName}`)
    })
}
interface FileProxy {
    fileName: string
    isDirectory: boolean
}

export function addFileNamesToTree(tree: object, nodePath: string, files: FileProxy[]): object {
    const parts = nodePath.split('/');
    // @ts-ignore
    let n = tree.root ? tree.root : tree;
    while (parts.length) {
        const part = parts.shift();
        // @ts-ignore
        n = n[part]
    }

    // assertUniqueFilenames(n, files.map());

    files.forEach(fileName => {
        // @ts-ignore
        n[fileName] = {ipfsHash: ''}
    });

    return tree;
}
