"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var crypto_1 = require("crypto");
exports.randomString = function () {
    var random = crypto_1.randomBytes(32);
    return random.toString('base64').replace(/\//g, '_');
};
