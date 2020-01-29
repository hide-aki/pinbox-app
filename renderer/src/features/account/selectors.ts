import {BurstAccount} from '../../typings/BurstAccount';

export const selectCurrentAccount = (state:any): BurstAccount => state.account.account;
