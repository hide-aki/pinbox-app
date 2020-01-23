import {logger} from '../logger';
import {ipfsInstance} from '../../globals';

export const withIpfs = (withIpfsFn: (ipfs: any) => any) : any => {
    const ipfsNode = ipfsInstance();
    if (ipfsNode) {
        return withIpfsFn(ipfsNode)
    } else {
        logger.debug('IPFS not available')
    }
};

