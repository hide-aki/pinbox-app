import React from 'react';
import {getFileEntry} from './getFileEntry';

export function extendFileListInformation (files: FileList | null, e: React.DragEvent): FileList | null {
    if (!files) return files;
    for (let i = 0; i < files.length; ++i) {
        const {isDirectory} = getFileEntry(e, i);
        // @ts-ignore
        files[i].isDirectory = isDirectory;
    }
    return files;
};
