"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHashAsync = void 0;
const node_crypto_1 = require("node:crypto");
const node_util_1 = require("node:util");
exports.createHashAsync = (0, node_util_1.promisify)(node_crypto_1.createHash);
//# sourceMappingURL=hasing.js.map