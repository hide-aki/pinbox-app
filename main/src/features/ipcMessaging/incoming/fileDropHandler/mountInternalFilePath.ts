import * as path from "path";
import {isTesting} from '../../../../utils/isTesting';

const PathDelimiter = '/';
export const mountInternalFilePath = (ifsNodePath: string, file: string, depth: number): string => {
    const fileName = path.win32.basename(file);
    let dirPath = path.win32.dirname(file);
    if (isTesting() || process.platform === 'win32') {
        dirPath = dirPath
            .replace(/\\/g, PathDelimiter) // put posix slashes
            .replace(/^\w+:/, ''); // remove win32 drive letter
    }
    const dirPathParts = dirPath.split(PathDelimiter);
    dirPath = dirPathParts.slice(dirPathParts.length - depth).join(PathDelimiter);
    return path.join(ifsNodePath, dirPath, fileName);
};
