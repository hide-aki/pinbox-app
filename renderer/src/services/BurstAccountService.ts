import {generateMasterKeys, getAccountIdFromPublicKey} from '@burstjs/crypto';
import {convertNumericIdToAddress} from '@burstjs/util';
import {Account, Api, ApiSettings, composeApi} from '@burstjs/core';

interface IAccountIdentifierType {
    publicKey: string,
    burstAddress: string,
    accountId: string,
}

export enum AccountState {
    UNDEFINED,
    ACTIVE,
    INACTIVE,
    NOT_FOUND
}

// FIXME: must be configurable
const DefaultApi = composeApi(new ApiSettings(
    "http://testnet.getburst.net:6876",
    "/burst")
);

export class BurstAccountService {

    constructor(private api: Api = DefaultApi) {
    }

    public getAccountIdentifiers(passphrase: string): IAccountIdentifierType {
        if (!passphrase || !passphrase.length) {
            return {
                publicKey: '',
                burstAddress: '',
                accountId: '',
            }
        }
        const {publicKey} = generateMasterKeys(passphrase);
        const accountId = getAccountIdFromPublicKey(publicKey);
        const burstAddress = convertNumericIdToAddress(accountId);
        return {
            publicKey,
            burstAddress,
            accountId,
        }
    };

    public async verifyAccount(accountId: string): Promise<AccountState> {
        try {
            let account = await this.api.account.getAccount(accountId);
            // @ts-ignore
            return account.publicKey ? AccountState.ACTIVE : AccountState.INACTIVE
        } catch (e) {
            return AccountState.NOT_FOUND
        }
    }

    public async getAccount(accountId: string): Promise<Account> {
        return await this.api.account.getAccount(accountId);
    }
}

