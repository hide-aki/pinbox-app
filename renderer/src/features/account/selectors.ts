import {BurstAccount} from '../../typings/BurstAccount';

export const currentAccountSelector = (state: any): BurstAccount => state.account.account;
