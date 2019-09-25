// @ts-ignore
import {createNode} from 'ipfs';
import {config as devConfig} from './ipfs.config.dev'
import {config as prodConfig} from './ipfs.config'
import {logger} from '../logger';

const config = process.env.NODE_ENV === 'dev'
    ? devConfig
    : prodConfig;

export const createIpfsNode = (onReadyCallback: (node: any) => void) => {
    const ipfsNode = createNode(config);
    ipfsNode.on('ready', () => onReadyCallback(ipfsNode));
    ipfsNode.on('error', (e:Error) => logger.error(e.message))
};
