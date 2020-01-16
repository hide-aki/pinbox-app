import {encryptFileTo, FileCryptArgs} from '../fileDropHandler/fileCrypt';
import * as fs from 'fs';
import * as path from 'path';
import {randomString} from '../util/randomString';
import {logger} from '../logger';

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

    public constructor(private _accountId: string) {
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
            accountId: this._accountId,
            created: this._created,
            updated: this._updated,
            fileRecords: this._fileRecords,
        }
    }

    private static fromJSON(json: any): FileStructure {
        let fileStructure = new FileStructure(json.accountId);
        fileStructure._created = json.created;
        fileStructure._updated = json.updated;
        fileStructure._fileRecords = json.fileRecords;
        return fileStructure
    }

    public async save(filepath? :string ): Promise<void> {
        if (!this._isDirty) {
            return Promise.resolve();
        }

        try {
            this._updated = Date.now();
            const filename = filepath ? filepath : path.join(__dirname, '../../', `{ifs.${this._accountId}.json`);
            await fsp.writeFile(filename, JSON.stringify(this.toJSON()));
            const args: FileCryptArgs = {
                secret: 'MySecretT', // TODO: will be the private key of account
                inputFilePath: filename,
                outputFilePath: `${filename}.encode`,
                isCompressed: true
            };
            await encryptFileTo(args);
            await fsp.unlink(filename);
        }
        catch(e) {
            // TODO
        }
    }

    public static async read(filePath: string): Promise<FileStructure> {
        // TODO:
        // Decrypt (with burst privateKey)
        // Read from decrypted file
        let fileStructure = new FileStructure('');

        // set properties

        fileStructure._isDirty = false;
        return Promise.resolve(fileStructure);
    }
}
