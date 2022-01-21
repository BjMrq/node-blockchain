"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nodeAddress = exports.nodeHostname = exports.stateKeys = exports.appName = exports.blockchainName = exports.httpResponses = exports.port = exports.apiVersion = void 0;
const crypto_1 = require("crypto");
const os_1 = require("os");
exports.apiVersion = 'v1';
exports.port = 3000;
exports.httpResponses = {
    ok: 200,
    updated: 201,
    error: 500,
    unauthorized: 400
};
exports.blockchainName = 'sati';
exports.appName = `${exports.blockchainName}-blockchain-api`;
exports.stateKeys = {
    helpers: 'helpers',
    records: 'records',
    transactions: 'transactions',
    jwtPayload: 'jwtPayload',
    validatedRequest: 'validatedRequest'
};
exports.nodeHostname = (0, os_1.hostname)();
exports.nodeAddress = (0, crypto_1.randomUUID)().replaceAll('-', '');
//# sourceMappingURL=constants.js.map