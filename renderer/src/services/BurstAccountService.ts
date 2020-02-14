import {generateMasterKeys, getAccountIdFromPublicKey} from '@burstjs/crypto';
import {convertBurstTimeToEpochTime, convertNumericIdToAddress} from '@burstjs/util';
import {BurstAccount} from '../typings/BurstAccount';
import {BurstService} from './BurstService';
import {Transaction, TransactionRewardRecipientSubtype, TransactionType} from '@burstjs/core';
import {ActivatorUrl, PoolAccountId} from '../utils/constants';
import {HttpImpl} from '@burstjs/http';
import {Subscription} from '../typings/Subscription';
import {PoolService} from './PoolService';

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

// @ts-ignore
const sortByTimestampAsc = (a: Transaction, b: Transaction) => a.blockTimestamp - b.blockTimestamp;

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

    private async fetchGiftSubscription(accountId: string): Promise<Subscription | null> {
        return this.withBrsErrorTranslation(async (): Promise<Subscription | null> => {
            const [poolInformations, poolRewardAssignments] = await Promise.all([
                new PoolService().fetchAllPoolInformationMessages(),
                this.api.account.getAccountTransactions({
                    accountId,
                    subtype: TransactionRewardRecipientSubtype.RewardRecipientAssignment,
                    type: TransactionType.RewardRecipient,
                })
            ]);

            // get first reward recipient message for pool account
            const orderedByHeight = poolRewardAssignments.transactions
                .filter(({recipient}) => recipient === PoolAccountId)
                .sort(sortByTimestampAsc);

            if (orderedByHeight.length === 0) {
                return null;
            }
            const firstRewardMessage = orderedByHeight[0];
            const startBurstTimestamp = (firstRewardMessage.timestamp || 0);
            const relevantPoolInfo = poolInformations
                .filter(p => p.timestamp <= startBurstTimestamp)
                .sort(sortByTimestampAsc)[0];

            const startTimestamp = convertBurstTimeToEpochTime(startBurstTimestamp);
            const endTimestamp = startTimestamp + relevantPoolInfo.gift.periodSecs;
            return {
                version: 1,
                unit: relevantPoolInfo.gift.unit,
                value: relevantPoolInfo.gift.value,
                cancelable: false,
                startTimestamp,
                endTimestamp,
            };
        })
    }

    private async fetchOrderedSubscriptions(accountId: string): Promise<Subscription[] | null> {

        // TODO: implement real fetch
        return Promise.resolve(null)
        //     [{
        //     // startTimestamp: Date.now(),
        //     // endTimestamp: Date.now() + 3600 * 7,
        //     // value: 5,
        //     // unit: 'G',
        //     // cancelable: true,
        //     // version: 1,
        // }])
    }


    async fetchSubscriptions(accountId: string): Promise<Subscription[]> {

        const [gift, ordered] = await Promise.all([
            this.fetchGiftSubscription(accountId),
            this.fetchOrderedSubscriptions(accountId),
        ]);
        let subscriptions = ordered || [];
        return gift ? subscriptions.concat(gift) : subscriptions;
    }


}

