import Ipfs from 'ipfs'
import devConfig from './ipfs.config.dev.json'
import prodConfig from './ipfs.config.json'
// import {logger} from './common/logger'

const config = process.env.NODE_ENV === 'dev'
    ? devConfig
    : prodConfig;

const ipfs = new Ipfs(config);

ipfs.on('error', e => {
    console.log(e)
    // logger.error('Could not initialize IPFS', e)
});

export {ipfs}
