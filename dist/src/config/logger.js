"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
const logger = winston_1.default.createLogger({
    level: 'info',
    format: winston_1.default.format.combine(winston_1.default.format.prettyPrint(), winston_1.default.format.json())
});
logger.add(new winston_1.default.transports.Console({
    format: winston_1.default.format.combine(winston_1.default.format.prettyPrint(), winston_1.default.format.json(), winston_1.default.format.colorize(), winston_1.default.format.timestamp(), winston_1.default.format.printf(({ timestamp, level, message }) => `[${timestamp}] ${level} - ${JSON.stringify(message || '""', undefined, 2)}`)),
    level: 'debug'
}));
exports.default = logger;
//# sourceMappingURL=logger.js.map