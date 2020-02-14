import {BurstAccount} from '../../typings/BurstAccount';
import {Tristate} from '../../typings/Tristate';
import {Subscription} from '../../typings/Subscription';

export const currentAccountSelector = (state: any): BurstAccount => state.account.account;
export const activationStateSelector = (state: any): Tristate => state.account.activationState;
export const subscriptionsSelector = (state:any): Subscription[] => state.account.subscriptions || [];
