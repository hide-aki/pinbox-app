"use strict";
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
var fileCrypt_1 = require("../fileDropHandler/fileCrypt");
var fs = require("fs");
var path = require("path");
var randomString_1 = require("../util/randomString");
var fsp = fs.promises;
var FileStructureRecord = /** @class */ (function () {
    function FileStructureRecord(originalFilePath, ipfsHash) {
        this.originalFilePath = originalFilePath;
        this.ipfsHash = ipfsHash;
        this.created = Date.now();
        this.nonce = randomString_1.randomString();
    }
    return FileStructureRecord;
}());
exports.FileStructureRecord = FileStructureRecord;
var FileStructure = /** @class */ (function () {
    function FileStructure(_accountId) {
        this._accountId = _accountId;
        this._created = Date.now();
        this._updated = Date.now();
        this._fileRecords = {};
        this._isDirty = true;
    }
    FileStructure.prototype.addFileRecord = function (fileRecord) {
        var ipfsHash = fileRecord.ipfsHash;
        if (this._fileRecords[ipfsHash]) {
            throw new Error("[" + ipfsHash + "] was already added");
        }
        this._fileRecords[ipfsHash] = fileRecord;
        this._isDirty = true;
    };
    FileStructure.prototype.toJSON = function () {
        return {
            accountId: this._accountId,
            created: this._created,
            updated: this._updated,
            fileRecords: this._fileRecords,
        };
    };
    FileStructure.fromJSON = function (json) {
        var fileStructure = new FileStructure(json.accountId);
        fileStructure._created = json.created;
        fileStructure._updated = json.updated;
        fileStructure._fileRecords = json.fileRecords;
        return fileStructure;
    };
    FileStructure.prototype.save = function (filepath) {
        return __awaiter(this, void 0, void 0, function () {
            var filename, args, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this._isDirty) {
                            return [2 /*return*/, Promise.resolve()];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        this._updated = Date.now();
                        filename = filepath ? filepath : path.join(__dirname, '../../', "{ifs." + this._accountId + ".json");
                        return [4 /*yield*/, fsp.writeFile(filename, JSON.stringify(this.toJSON()))];
                    case 2:
                        _a.sent();
                        args = {
                            secret: 'MySecretT',
                            inputFilePath: filename,
                            outputFilePath: filename + ".encode",
                            isCompressed: true
                        };
                        return [4 /*yield*/, fileCrypt_1.encryptFileTo(args)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _a.sent();
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    FileStructure.read = function (filePath) {
        return __awaiter(this, void 0, void 0, function () {
            var fileStructure;
            return __generator(this, function (_a) {
                fileStructure = new FileStructure('');
                // set properties
                fileStructure._isDirty = false;
                return [2 /*return*/, Promise.resolve(fileStructure)];
            });
        });
    };
    return FileStructure;
}());
exports.FileStructure = FileStructure;
