import {Account} from '@burstjs/core'

export enum ClaimState {
    NotClaimedYet,
    ClaimPending,
    Claimed
}

export interface BurstAccount extends Account {
    publicKey: string,
    claimSpaceState: ClaimState
}
