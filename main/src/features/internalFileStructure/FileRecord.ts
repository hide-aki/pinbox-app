import {randomString} from '../../util/randomString';

export class FileRecord {
    public nonce: string;
    public created: number;

    constructor(
        public nodePath: string,
        public ipfsHash: string,
    ) {
        this.created = Date.now();
        this.nonce = randomString();
    }
}
