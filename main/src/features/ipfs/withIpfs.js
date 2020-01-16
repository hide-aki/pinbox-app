"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var logger_1 = require("../logger");
exports.withIpfs = function (withIpfsFn) {
    // @ts-ignore
    var ipfsNode = global.ipfs;
    if (ipfsNode) {
        withIpfsFn(ipfsNode);
    }
    else {
        logger_1.logger.debug('IPFS not available');
    }
};
