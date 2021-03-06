export const config = {
  "repo": "./ipfs/data",
  "silent": false,
  "config": {
    "Addresses": {
      "Swarm": [
        "/ip4/0.0.0.0/tcp/4012",
        "/ip4/127.0.0.1/tcp/4013/ws"
      ]
    }
  },
  "EXPERIMENTAL": {
    "pubsub": true
  }
};

