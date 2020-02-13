import {generateMasterKeys, getAccountIdFromPublicKey} from '@burstjs/crypto';
import {convertNumericIdToAddress} from '@burstjs/util';
import {BurstAccount} from '../typings/BurstAccount';
import {BurstService} from './BurstService';
import {
    Transaction,
    TransactionArbitrarySubtype,
    TransactionRewardRecipientSubtype,
    TransactionType
} from '@burstjs/core';
import {ActivatorUrl, PoolAccountId} from '../utils/constants';
import {HttpImpl} from '@burstjs/http';
import {Subscription} from '../typings/Subscription';

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

const sortByHeightAsc = (a: Transaction, b: Transaction) => {
    if (a.height === b.height) {
        return 0
    }
    // @ts-ignore
    return a.height < b.height ? -1 : 1
};


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

    private async fetchGiftSubscription(accountId: string): Promise<Subscription> {
        // get first reward recipient message for pool account
        const {transactions} = await this.api.account.getAccountTransactions({
            accountId,
            subtype: TransactionRewardRecipientSubtype.RewardRecipientAssignment,
            type: TransactionType.RewardRecipient,
        });

        const orderedByHeight = transactions
            .filter(({recipient}) => recipient === PoolAccountId)
            .sort(sortByHeightAsc);

        console.log(orderedByHeight);
        //
        // // find the closest pool info message below that blockheight
        // const {transactions} = await this.api.account.getAccountTransactions({
        //     accountId: PoolAccountId,
        //     subtype: TransactionArbitrarySubtype.Message,
        //     type: TransactionType.Arbitrary,
        // });

        // TODO: implement real fetch
        return Promise.resolve({
            orderDate: Date.now(),
            value: 1,
            unit: 'G',
            validThru: Date.now() + 3600 * 7,
            cancelable: false,
        })
    }

    private async fetchOrderedSubscriptions(accountId: string): Promise<Subscription[]> {

        // TODO: implement real fetch
        return Promise.resolve([{
            orderDate: Date.now(),
            value: 5,
            unit: 'G',
            validThru: Date.now() + 3600 * 7,
            cancelable: true,
        }])
    }


    async fetchSubscriptions(accountId: string): Promise<Subscription[]> {

        const [gift, own] = await Promise.all([
            this.fetchGiftSubscription(accountId),
            this.fetchOrderedSubscriptions(accountId),
        ]);

        // TODO: implement subscriptions in BurstJS and call it here
        return new Promise((resolve => {
                setTimeout(() => {
                    resolve([gift, ...own])
                }, 1000)
            })
        );
    }


}

