import {generateMasterKeys, getAccountIdFromPublicKey} from '@burstjs/crypto';
import {convertNumericIdToAddress} from '@burstjs/util';
import {Account, Api, ApiSettings, composeApi} from '@burstjs/core';
import {SettingsService} from './SettingsService';
import {defaultPeer} from '../app/burstPeers';

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

export class BurstAccountService {

    private api: Api;

    constructor() {
        const settings = new SettingsService().getSettings();
        const peer = settings ? settings.peer : defaultPeer;
        this.api = composeApi(new ApiSettings(peer))
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

    public async fetchAccount(accountId: string): Promise<Account> {
        return await this.api.account.getAccount(accountId);
    }
}

