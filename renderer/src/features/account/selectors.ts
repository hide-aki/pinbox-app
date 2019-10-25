import {Account} from '@burstjs/core'

export const selectCurrentAccount = (state:any): Account => state.account.account;
