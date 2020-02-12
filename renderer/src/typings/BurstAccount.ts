import {Account} from '@burstjs/core'
import {Tristate} from './Tristate';

export interface BurstAccount extends Account {
    claimSpaceState: Tristate
    publicKey: string,
}
