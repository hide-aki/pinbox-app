import {encryptFileTo, FileCryptArgs} from './fileCrypt';

export const __handleFile = async (file: string): Promise<void> => {
        const args: FileCryptArgs = {
            secret: 'MySecretT',
            inputFilePath: file,
            outputFilePath: `${file}.x`
        };
        // TODO: see if this causes hiccups in renderer thread then
        await encryptFileTo(args)
 };

export const handleFileDrop = (files: string[]) => files.forEach(__handleFile);
