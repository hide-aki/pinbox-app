import {BurstAccount} from '../../typings/BurstAccount';
import {Tristate} from '../../typings/Tristate';

export const currentAccountSelector = (state: any): BurstAccount => state.account.account;
export const activationStateSelector = (state: any): Tristate => state.account.activationState;
