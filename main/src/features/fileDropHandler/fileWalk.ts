import * as fs from 'fs';
import { join } from 'path';

const fsp = fs.promises;
export const fileWalk = async (filePath: string, applyFn: (file: string) => void) : Promise<void> => {
    const fileStats = await fsp.stat(filePath);
    if(fileStats.isDirectory()){
        const dirFiles = await fsp.readdir(filePath);
        for(let i=0; i<dirFiles.length; ++i){
            const dirFile = dirFiles[i];
            if(dirFile === '.' || dirFile === '..') continue;
            await fileWalk(join(filePath, dirFile), applyFn)
        }
    }
    else{
        applyFn(filePath);
    }
};
