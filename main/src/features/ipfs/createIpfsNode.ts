// @ts-ignore
import {create} from 'ipfs';
import {config as devConfig} from './ipfs.config.dev'
import {config as prodConfig} from './ipfs.config'
import {logger} from '../logger';

const config = process.env.NODE_ENV === 'dev'
    ? devConfig
    : prodConfig;

export const createIpfsNode = async (): Promise<any> => {
    try {
        return await create(config);
    } catch (e) {
        logger.error(e.message)
    }
};
