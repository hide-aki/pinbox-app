import * as fs from 'fs';
import {join} from 'path';
import {promisify} from 'util';

// fs.promises generates conflicts with jest
const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);

export const fileWalk = async (filePath: string, applyFn: (file: string, depth: number) => Promise<any>, depth: number = 0): Promise<any> => {
    const fileStats = await stat(filePath);
    if (fileStats.isDirectory()) {
        const dirFiles = await readdir(filePath);
        for (let i = 0; i < dirFiles.length; ++i) {
            const dirFile = dirFiles[i];
            if (dirFile === '.' || dirFile === '..') continue;
            await fileWalk(join(filePath, dirFile), applyFn, depth + 1)
        }
    } else {
        return await applyFn(filePath, depth);
    }
};
