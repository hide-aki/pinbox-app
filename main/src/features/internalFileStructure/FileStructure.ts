import {encryptFileTo, FileCryptArgs} from '../cryptography/fileCrypt';
import * as fs from 'fs';
import * as path from 'path';
import {randomString} from '../../util/randomString';
import {hashSecret} from '../cryptography/hashSecret';
import {handleException} from '../exceptions';

const fsp = fs.promises;

export class FileStructureRecord {
    public nonce: string;
    public created: number;

    constructor(public originalFilePath: string,
                public ipfsHash: string,
    ) {
        this.created = Date.now();
        this.nonce = randomString();
    }
}

export class FileStructure {
    private _created = Date.now();
    private _updated = Date.now();
    private _fileRecords: any = {};
    private _isDirty = true;

    public constructor(private _privateKey: string, private _publicKey: string) {
    }

    public addFileRecord(fileRecord: FileStructureRecord) {
        const {ipfsHash} = fileRecord;
        if (this._fileRecords[ipfsHash]) {
            throw new Error(`[${ipfsHash}] was already added`)
        }
        this._fileRecords[ipfsHash] = fileRecord;
        this._isDirty = true
    }

    public toJSON(): object {
        return {
            publicKey: this._publicKey,
            created: this._created,
            updated: this._updated,
            fileRecords: this._fileRecords,
        }
    }

    private static fromJSON(json: any): FileStructure {
        // TODO:
        let fileStructure = new FileStructure('', '');
        // fileStructure._created = json.created;
        // fileStructure._updated = json.updated;
        // fileStructure._fileRecords = json.fileRecords;
        return fileStructure
    }

    public async save(filepath?: string): Promise<void> {
        if (!this._isDirty) {
            return Promise.resolve();
        }

        try {
            this._updated = Date.now();
            const filename = filepath ? filepath : path.join(__dirname, '../../', `{ifs.${this._publicKey}.json`);
            await fsp.writeFile(filename, JSON.stringify(this.toJSON()));
            const secret = await hashSecret(this._privateKey);
            const args: FileCryptArgs = {
                secret: secret.hash,
                inputFilePath: filename,
                outputFilePath: filename.replace('json', 'x'),
                isCompressed: true
            };
            await encryptFileTo(args);
            await fsp.unlink(filename);
        } catch (e) {
            handleException(e)
        }
    }

    public static async read(filePath: string): Promise<FileStructure> {
        // TODO:
        // Decrypt (with burst privateKey)
        // Read from decrypted file
        let fileStructure = new FileStructure('', '');

        // set properties

        fileStructure._isDirty = false;
        return Promise.resolve(fileStructure);
    }
}
