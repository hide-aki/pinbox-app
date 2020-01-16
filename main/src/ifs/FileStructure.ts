import {encryptFileTo, FileCryptArgs} from '../fileDropHandler/fileCrypt';
import * as fs from 'fs';
import * as path from 'path';
import {withIpfs} from '../ipfs/withIpfs';
import {randomString} from '../util/randomString';

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

    private toJSON(): object {
        return {
            accountId: this._accountId,
            created: this._created,
            update: this._updated,
            fileRecords: this._fileRecords,
        }
    }

    private static fromJSON(json: any): FileStructure {
        let metaInfo = new FileStructure(json.accountId);
        metaInfo._created = json.created;
        metaInfo._updated = json.updated;
        metaInfo._fileRecords = json.fileRecords;
        return metaInfo
    }

    public async publish(): Promise<void> {
        if (!this._isDirty) {
            return Promise.resolve();
        }
        withIpfs(async ipfs => {
            try {
                this._updated = Date.now();
                const filename = path.join(__dirname, '../../', `{pinbox.meta.${this._accountId}.json`);
                const args: FileCryptArgs = {
                    secret: 'MySecretT',
                    inputFilePath: filename,
                    outputFilePath: `${filename}.encode`,
                    isCompressed: true
                };
                await fsp.writeFile(filename, JSON.stringify(this.toJSON()));
                await encryptFileTo(args);
                // add file to ipfs
                const result = await ipfs.addFromFs(args.outputFilePath);
                console.log('TODO: publish...', result.id);
                // ipfs.name.publish()
                // publish file

            } catch (e) {

            }
        });

        return Promise.resolve();
    }

    public static async read(): Promise<FileStructure> {
        // TODO:
        // read IPNS Hash from Burst
        // --> if not found -> create
        // resolver IPNS to IPFS
        // get IPFS File
        // Decrypt (with burst privateKey)
        // Read from decrypted file
        let metaInfo = new FileStructure('');

        // set properties

        metaInfo._isDirty = false;
        return Promise.resolve(metaInfo);
    }
}
