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
Object.defineProperty(exports, "__esModule", { value: true });
var winston_transport_1 = require("winston-transport");
var NullTransport = /** @class */ (function (_super) {
    __extends(NullTransport, _super);
    function NullTransport(options) {
        if (options === void 0) { options = {}; }
        return _super.call(this, options) || this;
    }
    NullTransport.prototype.log = function (info, next) {
        // noop
        next();
    };
    return NullTransport;
}(winston_transport_1.default));
exports.NullTransport = NullTransport;
