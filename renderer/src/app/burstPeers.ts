
const availableDevPeers : string[] = [
    "http://testnet.getburst.net:6876"
];
const availableProductionPeers : string[] = [
    "https://wallet.burst-alliance.org:8125"
];

export const availablePeers = process.env.NODE_ENV === 'production' ? availableProductionPeers : availableDevPeers;
export const defaultPeer =  availablePeers[0];
