import {generateMasterKeys, getAccountIdFromPublicKey} from '@burstjs/crypto';
import {convertNumericIdToAddress} from '@burstjs/util';
import {Api, ApiSettings, composeApi} from '@burstjs/core';
import {SettingsService} from './SettingsService';
import {defaultPeer} from '../app/burstPeers';
import {BurstAccount} from '../typings/BurstAccount';
import {BurstService} from './BurstService';

interface IAccountIdentifierType {
    publicKey: string,
    burstAddress: string,
    accountId: string,
}

export enum AccountState {
    Undefined,
    Active,
    Inactive,
    NotFound
}

export class BurstAccountService extends BurstService{

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
            let account = await this.fetchAccount(accountId);
            return account.publicKey ? AccountState.Active : AccountState.Inactive
        } catch (e) {
            return AccountState.NotFound
        }
    }

    public async fetchAccount(accountId: string): Promise<BurstAccount> {
        return await this.api.account.getAccount(accountId) as BurstAccount;
    }
}

