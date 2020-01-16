import {logger} from '../logger';

export const withIpfs = (withIpfsFn: (ipfs: any) => void) => {
    // @ts-ignore
    const ipfsNode = global.ipfs;
    if (ipfsNode) {
        withIpfsFn(ipfsNode)
    } else {
        logger.debug('IPFS not available')
    }
};

