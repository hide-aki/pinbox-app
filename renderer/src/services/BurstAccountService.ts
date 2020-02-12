import {generateMasterKeys, getAccountIdFromPublicKey} from '@burstjs/crypto';
import {convertNumericIdToAddress} from '@burstjs/util';
import {BurstAccount} from '../typings/BurstAccount';
import {BurstService} from './BurstService';
import {TransactionRewardRecipientSubtype, TransactionType} from '@burstjs/core';
import {ActivatorUrl, PoolAccountId} from '../utils/constants';
import {HttpImpl} from '@burstjs/http';

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

export class BurstAccountService extends BurstService {

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

    public async activateAccount(publickey: string): Promise<void> {
        const account = getAccountIdFromPublicKey(publickey);
        const http = new HttpImpl(ActivatorUrl);
        try {
            await http.post('api/activate', {account, publickey});
        } catch (e) {
            const errObj = e.data;
            throw new Error(errObj.message)
        }
    }

    public async verifyAccount(accountId: string): Promise<AccountState> {
        try {
            let account = await this.fetchAccount(accountId);
            return account.publicKey ? AccountState.Active : AccountState.Inactive
        } catch (e) {
            return AccountState.NotFound
        }
    }

    async verifyHasClaimedFreeSpace(accountId: string): Promise<boolean> {
        try {
            const {transactions} = await this.api.account.getAccountTransactions({
                accountId,
                subtype: TransactionRewardRecipientSubtype.RewardRecipientAssignment,
                type: TransactionType.RewardRecipient,
            });
            const {unconfirmedTransactions} = await this.api.account.getUnconfirmedAccountTransactions(
                accountId,
            );
            const unconfirmedRewardAssignments = unconfirmedTransactions
                .filter(t =>
                    t.type === TransactionType.RewardRecipient &&
                    t.subtype === TransactionRewardRecipientSubtype.RewardRecipientAssignment
                );
            transactions.push(...unconfirmedRewardAssignments);
            // TODO: Consider older messages, if tx count > 500

            return transactions
                .some(({recipient}) => recipient === PoolAccountId);
        } catch (e) {
            return false;
        }
    }

    public async fetchAccount(accountId: string): Promise<BurstAccount> {
        return await this.api.account.getAccount(accountId) as BurstAccount;
    }

}

