interface IpfsReadyType {
    ipfsId: string
}

export const handleIpfsReady = (payload:IpfsReadyType) => {
    console.log('handleIpfsReady', payload)
};
