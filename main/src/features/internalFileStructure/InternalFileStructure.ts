import {readFile as _readFile, writeFile as _writeFile} from 'fs'
import {join} from 'path'
import {promisify} from 'util'
import {app} from 'electron';
import {get, set} from 'lodash'
import {IfsData} from './IfsData';
import {FileRecord} from './FileRecord';
import {ipfsInstance} from '../../globals';
import {decryptFileFrom, encryptFileTo} from '../cryptography/fileCrypt';
import {derivePassword} from '../cryptography/derivePassword';
import {randomString} from '../../utils/randomString';
import {logger} from '../logger';

const EmptyIfsData: IfsData = {
    records: {root: {}},
    lastModified: Date.now()
};

const IfsStaticNonce = 'ifs';

const writeFile = promisify(_writeFile);
const readFile = promisify(_readFile);

/**
 *
 */
export class InternalFileStructure {
    private _mutated: boolean = false;

    public constructor(private _data: IfsData = EmptyIfsData) {
    }

    public static async loadFromIpfs(ipfsHash: string, publicKey: string): Promise<InternalFileStructure> {
        // 1. get file from ipfs
        const ipfs = ipfsInstance();
        const chunks = [];
        for await (const chunk of ipfs.cat(ipfsHash)) {
            chunks.push(chunk)
        }
        // 2. decrypt
        const localFilePath = join(app.getAppPath(), `ifs.${publicKey}.enc`);
        const plainTextFilePath = localFilePath.replace('.enc', '.json');
        await writeFile(localFilePath, Buffer.concat(chunks));
        const secret = await derivePassword(publicKey, IfsStaticNonce);
        await decryptFileFrom({
            inputFilePath: localFilePath,
            isCompressed: true,
            outputFilePath: plainTextFilePath,
            secret,
        });
        // 3. load IFS now
        const ifsData: string = await readFile(plainTextFilePath, 'utf-8');
        return new InternalFileStructure(JSON.parse(ifsData))
    }

    get mutated(): boolean {
        return this._mutated;
    }

    get data(): IfsData {
        return this._data;
    }

    private static splitNodePath(nodePath: string): string[] {
        return nodePath.split('/').filter(p => p && p.length > 0);
    }

    public upsertFileRecord(fileRecord: FileRecord) {
        const parts = InternalFileStructure.splitNodePath(fileRecord.nodePath);
        set(this.data.records.root, parts, fileRecord.toPersistableJson());
        this.updateModifiedDate()
    }

    public renameFileRecord(nodePath: string, newName: string) {
        const parts = InternalFileStructure.splitNodePath(nodePath);
        const tmp = get(this.data.records.root, parts);
        const oldName = parts.splice(Math.max(parts.length - 1, 0));
        const parent = parts.length ? get(this.data.records.root, parts) : this.data.records.root;
        parent[newName] = tmp;
        delete parent[oldName[0]];
        this.updateModifiedDate()
    }

    public async saveToIpfs(publicKey: string): Promise<string> {
        const inputFilePath = join(app.getAppPath(), `ifs.${publicKey}.json`);
        await writeFile(inputFilePath, JSON.stringify(this.data));
        const outputFilePath = randomString();
        const secret = await derivePassword(publicKey, IfsStaticNonce);
        await encryptFileTo({
            inputFilePath,
            isCompressed: true,
            outputFilePath,
            secret,
        });
        const result = await  ipfsInstance().addFromFs(outputFilePath);
        return result[0].hash;
    }

    private updateModifiedDate() {
        this.data.lastModified = Date.now();
        this._mutated = true
    }
}
