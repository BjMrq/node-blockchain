"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorEvent = exports.errorHandler = void 0;
const logger_1 = __importDefault(require("./logger"));
const errorEvent = 'error';
exports.errorEvent = errorEvent;
const errorHandler = (error, context) => {
    logger_1.default.error({
        method: context.method,
        path: context.path,
        error: {
            name: error.name,
            stack: error.stack
        }
    });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=on-error.js.map