import {ipfsInstance} from '../../singletons';

export const withIpfs = (withIpfsFn: (ipfs: any) => Promise<any>) : Promise<any> => {
    const ipfsNode = ipfsInstance();
    return withIpfsFn(ipfsNode)
};

