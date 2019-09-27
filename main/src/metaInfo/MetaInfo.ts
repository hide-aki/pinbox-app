import {encryptFileTo, FileCryptArgs} from '../fileDropHandler/fileCrypt';
import * as fs from 'fs';
import * as path from 'path';
import {withIpfs} from '../ipfs/withIpfs';

const fsp = fs.promises;

export class MetaInfoFileRecord {
    constructor(public originalFilePath: string,
                public ipfsHash: string,
    ) {
    }
}

export class MetaInfo {
    private _created = Date.now();
    private _updated = Date.now();
    private _fileRecords: any = {};
    private _isDirty = true;

    public constructor(private _accountId: string) {
    }

    public addFileRecord(fileRecord: MetaInfoFileRecord) {
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

    private static fromJSON(json: any): MetaInfo {
        let metaInfo = new MetaInfo(json.accountId);
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

    public static async read(): Promise<MetaInfo> {
        // TODO:
        // read IPNS Hash from Burst
        // --> if not found -> create
        // resolver IPNS to IPFS
        // get IPFS File
        // Decrypt (with burst privateKey)
        // Read from decrypted file
        let metaInfo = new MetaInfo('');

        // set properties

        metaInfo._isDirty = false;
        return Promise.resolve(metaInfo);
    }
}
