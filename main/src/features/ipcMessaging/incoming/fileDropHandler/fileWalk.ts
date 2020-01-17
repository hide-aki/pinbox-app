import * as fs from 'fs';
import {join} from 'path';
import {promisify} from 'util';

// fs.promises generates conflicts with jest
const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);

export const fileWalk = async (filePath: string, applyFn: (file: string) => void): Promise<void> => {
    const fileStats = await stat(filePath);
    if (fileStats.isDirectory()) {
        const dirFiles = await readdir(filePath);
        for (let i = 0; i < dirFiles.length; ++i) {
            const dirFile = dirFiles[i];
            if (dirFile === '.' || dirFile === '..') continue;
            await fileWalk(join(filePath, dirFile), applyFn)
        }
    } else {
        applyFn(filePath);
    }
};
