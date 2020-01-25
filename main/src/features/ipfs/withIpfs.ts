import {logger} from '../logger';
import {ipfsInstance} from '../../globals';

export const withIpfs = (withIpfsFn: (ipfs: any) => Promise<any>) : Promise<any> => {
    const ipfsNode = ipfsInstance();
    if (ipfsNode) {
        return withIpfsFn(ipfsNode)
    } else {
        logger.debug('IPFS not available')
        return Promise.resolve(null)
    }
};

