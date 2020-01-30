import {readFile as _readFile, writeFile as _writeFile, existsSync, unlinkSync} from 'fs'
import {promisify} from 'util'
import {get, set} from 'lodash'
import {IfsData} from '../../sharedTypings/IfsData';
import {FileRecord} from './FileRecord';
import {ipfsInstance} from '../../singletons';
import {decryptFileFrom, encryptFileTo} from '../cryptography/fileCrypt';
import {randomString} from '../../utils/randomString';
import {logger} from '../logger';
import {FileNotFoundError} from '../exceptions';
import {isDevelopment} from '../../utils/isDevelopment';
import {isProduction} from '../../utils/isProduction';

const EmptyIfsData: IfsData = {
    records: {root: {}},
    lastModified: Date.now()
};

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

    public hasRecords(): boolean {
        return Object.keys(this.data.records.root).length > 0
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

    public static async loadFromLocal(inputFilePath: string, secret: string = ''): Promise<InternalFileStructure> {
        logger.debug('Loading IFS locally', inputFilePath);
        let outputFilePath = inputFilePath;
        if(!existsSync(outputFilePath)){
            throw new FileNotFoundError(outputFilePath)
        }
        if (secret !== '') {
            outputFilePath += '.tmp';
            logger.debug(`Decrypting IFS...`);
            await decryptFileFrom({
                isCompressed: true,
                secret,
                inputFilePath,
                outputFilePath
            });
        }
        logger.debug(`Reading decrypted IFS...`);
        const data = await readFile(outputFilePath, 'utf-8');
        if(isProduction()){
            unlinkSync(outputFilePath);
        }
        const ifsData = JSON.parse(data);
        return new InternalFileStructure(ifsData);
    }

    public async saveToLocal(outputFilePath: string, secret: string = ''): Promise<string> {
        logger.debug('Saving IFS locally', outputFilePath);
        if (secret === '') {
            await writeFile(outputFilePath, JSON.stringify(this.data), 'utf-8');
            return outputFilePath
        }
        logger.debug(`Encrypting IFS...`);
        const inputFilePath = outputFilePath + '.tmp';
        await writeFile(inputFilePath, JSON.stringify(this.data), 'utf-8');
        await encryptFileTo({
            inputFilePath,
            isCompressed: true,
            outputFilePath,
            secret,
        });
        if(isProduction()){
            unlinkSync(inputFilePath)
        }
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
