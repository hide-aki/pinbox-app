import {readFile as _readFile, writeFile as _writeFile} from 'fs'
import {join} from 'path'
import {promisify} from 'util'
import {app} from 'electron';
import {get, set} from 'lodash'
import {IfsData} from './IfsData';
import {FileRecord} from './FileRecord';
import {ipfsInstance} from '../../globals';
import {decryptFileFrom, encryptFileTo} from '../cryptography/fileCrypt';
import {randomString} from '../../utils/randomString';

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

    get mutated(): boolean {
        return this._mutated;
    }

    get data(): IfsData {
        return this._data;
    }

    public constructor(private _data: IfsData = EmptyIfsData) {
    }

    public static async loadFromIpfs(ipfsHash: string, localOutputPath: string, secret: string): Promise<InternalFileStructure> {
        const ipfs = ipfsInstance();
        const chunks = [];
        for await (const chunk of ipfs.cat(ipfsHash)) {
            chunks.push(chunk)
        }
        await writeFile(localOutputPath, Buffer.concat(chunks));
        return InternalFileStructure.loadFromLocal(localOutputPath, secret);
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

    private static getLocalFilepath(publicKey: string, suffix: string = 'enc'): string {
        return join(app.getAppPath(), `ifs.${publicKey}.${suffix}`);
    }

    public static async loadFromLocal(inputFilePath: string, secret: string = ''): Promise<InternalFileStructure> {
        let outputFilePath = inputFilePath;
        if (secret !== '') {
            outputFilePath += '.tmp';
            await decryptFileFrom({
                isCompressed: true,
                secret,
                inputFilePath,
                outputFilePath
            });
        }
        const data = await readFile(outputFilePath, 'utf-8');
        const ifsData = JSON.parse(data);
        return new InternalFileStructure(ifsData);
    }

    public async saveToLocal(outputFilePath: string, secret: string = ''): Promise<string> {
        if (secret === '') {
            await writeFile(outputFilePath, JSON.stringify(this.data), 'utf-8');
            return outputFilePath
        }
        const inputFilePath = outputFilePath + '.tmp';
        await writeFile(inputFilePath, JSON.stringify(this.data), 'utf-8');
        await encryptFileTo({
            inputFilePath,
            isCompressed: true,
            outputFilePath,
            secret,
        });
        return outputFilePath;
    }

    public async saveToIpfs(secret: string): Promise<string> {
        const localFilePath = await this.saveToLocal(randomString(), secret);
        const result = await ipfsInstance().addFromFs(localFilePath);
        return result[0].hash;
    }

    private static splitNodePath(nodePath: string): string[] {
        return nodePath.split('/').filter(p => p && p.length > 0);
    }

    private updateModifiedDate() {
        this.data.lastModified = Date.now();
        this._mutated = true
    }
}
