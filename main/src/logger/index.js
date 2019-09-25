"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var winston_1 = require("winston");
var nullTransport_1 = require("./nullTransport");
var isLoggingEnabled = function () {
    var isEnabled = false;
    process.argv.forEach(function (val) {
        if (val === '--log') {
            isEnabled = true;
        }
    });
    return isEnabled;
};
var createFilename = function (type) {
    var z = function (n) { return n < 10 ? '0' + n : '' + n; };
    var date = new Date();
    var YYYY = date.getFullYear();
    var MM = z(date.getMonth() + 1);
    var DD = z(date.getDate());
    return path.join(process.cwd(), "pinbox-" + YYYY + MM + DD + "." + type + ".log");
};
var createTransports = function () {
    var transports = isLoggingEnabled()
        ? [
            new winston_1.transports.File({ filename: createFilename('error'), level: 'error', handleExceptions: true }),
            new winston_1.transports.File({ filename: createFilename('combined') })
        ]
        : [
            new nullTransport_1.NullTransport()
        ];
    if (process.env.TODE_ENV !== 'production') {
        transports.push(new winston_1.transports.Console({
            format: winston_1.format.combine(winston_1.format.colorize(), winston_1.format.simple())
        }));
    }
    return transports;
};
exports.logger = winston_1.createLogger({
    level: 'debug',
    format: winston_1.format.combine(winston_1.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
    }), winston_1.format.prettyPrint(), winston_1.format.errors({ stack: true })),
    exitOnError: false,
    transports: createTransports()
});
