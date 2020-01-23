import * as fs from 'fs';
import * as path from 'path';
import {encryptFileTo, FileCryptArgs} from '../cryptography/fileCrypt';
import {randomString} from '../../util/randomString';
import {hashSecret} from '../cryptography/hashSecret';
import {handleException} from '../exceptions';
import {promisify} from 'util';

const unlink = promisify(fs.unlink);
const writeFile = promisify(fs.writeFile);

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
    private _filePath: string;

    public constructor(private _accountId: string) {
        this._filePath = path.join(__dirname, '../../', `{ifs.${this._accountId}.json`);
        console.log('IFS', this.filePath)
    }

    get filePath() :string {
        return this._filePath;
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
            publicKey: this._accountId,
            created: this._created,
            updated: this._updated,
            fileRecords: this._fileRecords,
        }
    }

    public async save(filepath?: string, key?: string): Promise<void> {
        if (!this._isDirty) {
            return Promise.resolve();
        }

        try {
            this._updated = Date.now();
            const filename = filepath ? filepath : this._filePath;
            await writeFile(filename, JSON.stringify(this.toJSON()));
            // const secret = await hashSecret(key);
            // const args: FileCryptArgs = {
            //     secret: secret.hash,
            //     inputFilePath: filename,
            //     outputFilePath: filename.replace('json', 'x'),
            //     isCompressed: true
            // };
            // await encryptFileTo(args);
            // await unlink(filename);
        } catch (e) {
            handleException(e)
        }
    }

    public static async read(accountId: string, key: string): Promise<FileStructure> {
        // TODO: needed for recovery
        // Decrypt (with burst privateKey)
        // Read from decrypted file
        let fileStructure = new FileStructure(accountId);

        // set properties

        fileStructure._isDirty = false;
        return Promise.resolve(fileStructure);
    }
}
