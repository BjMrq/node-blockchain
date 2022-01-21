"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./config/constants");
const logger_1 = __importDefault(require("./config/logger"));
const server_1 = require("./config/server");
try {
    (0, server_1.startServer)();
    logger_1.default.info(`₿ ${constants_1.appName} is listening on port ${constants_1.port}, to the moon!`);
}
catch (error) {
    logger_1.default.error('Unable to run the server because of the following error:');
    logger_1.default.error(error.message);
}
//# sourceMappingURL=index.js.map