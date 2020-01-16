"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var zlib_1 = require("zlib");
var crypto_1 = require("crypto");
var stream_1 = require("stream");
var AppendInitVector = /** @class */ (function (_super) {
    __extends(AppendInitVector, _super);
    function AppendInitVector(initializationVector, opts) {
        var _this = _super.call(this, opts) || this;
        _this.initializationVector = initializationVector;
        _this.hasAppended = false;
        return _this;
    }
    AppendInitVector.prototype._transform = function (chunk, encoding, callback) {
        if (!this.hasAppended) {
            this.push(this.initializationVector);
            this.hasAppended = true;
        }
        this.push(chunk);
        callback();
    };
    return AppendInitVector;
}(stream_1.Transform));
var NullStream = /** @class */ (function (_super) {
    __extends(NullStream, _super);
    function NullStream() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return NullStream;
}(stream_1.Transform));
var getCipherKey = function (secret) { return crypto_1.createHash('sha256').update(secret).digest(); };
var CryptoParams = {
    IVByteLength: 16,
    Algorithm: 'aes-256-cbc'
};
exports.encryptFileTo = function (args) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, new Promise(function (resolve, reject) {
                var secret = args.secret, inputFilePath = args.inputFilePath, outputFilePath = args.outputFilePath, isCompressed = args.isCompressed;
                var readStream = fs_1.createReadStream(inputFilePath);
                var writeStream = fs_1.createWriteStream(outputFilePath);
                var gzipStream = isCompressed ? zlib_1.createGzip() : new stream_1.PassThrough();
                var iv = crypto_1.randomBytes(CryptoParams.IVByteLength);
                var cipherKey = getCipherKey(secret);
                var appendIVStream = new AppendInitVector(iv);
                var cipherStream = crypto_1.createCipheriv(CryptoParams.Algorithm, cipherKey, iv);
                readStream
                    .pipe(gzipStream)
                    .pipe(cipherStream)
                    .pipe(appendIVStream)
                    .pipe(writeStream)
                    .on('error', reject)
                    .on('finish', resolve);
            })];
    });
}); };
var getInitializationVector = function (inputFilePath) { return new Promise((function (resolve, reject) {
    var readIv = fs_1.createReadStream(inputFilePath, { end: CryptoParams.IVByteLength - 1 });
    var initializationVector;
    readIv.on('data', function (chunk) {
        initializationVector = chunk;
    });
    readIv.on('close', function () {
        resolve(initializationVector);
    });
    readIv.on('error', function () {
        reject(initializationVector);
    });
})); };
exports.decryptFileFrom = function (args) {
    return new Promise(function (resolve, reject) { return __awaiter(void 0, void 0, void 0, function () {
        var secret, inputFilePath, outputFilePath, isCompressed, iv, readStream, gunzipStream, writeStream, cipherKey, decipherStream;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    secret = args.secret, inputFilePath = args.inputFilePath, outputFilePath = args.outputFilePath, isCompressed = args.isCompressed;
                    return [4 /*yield*/, getInitializationVector(inputFilePath)];
                case 1:
                    iv = _a.sent();
                    readStream = fs_1.createReadStream(inputFilePath, { start: CryptoParams.IVByteLength });
                    gunzipStream = isCompressed ? zlib_1.createGunzip() : new stream_1.PassThrough();
                    writeStream = fs_1.createWriteStream(outputFilePath);
                    cipherKey = getCipherKey(secret);
                    decipherStream = crypto_1.createDecipheriv(CryptoParams.Algorithm, cipherKey, iv);
                    readStream
                        .pipe(decipherStream)
                        .pipe(gunzipStream)
                        .pipe(writeStream)
                        .on('error', reject)
                        .on('finish', resolve);
                    return [2 /*return*/];
            }
        });
    }); });
};
