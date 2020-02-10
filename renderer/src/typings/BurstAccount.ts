import {Account} from '@burstjs/core'

export interface BurstAccount extends Account {
    publicKey: string,
    hasClaimedFreeSpace: boolean
}
