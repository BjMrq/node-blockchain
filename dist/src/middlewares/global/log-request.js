"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logRequestsMiddleware = void 0;
const logger_1 = __importDefault(require("../../config/logger"));
const date_1 = require("../../utils/date");
const logRequestsMiddleware = async (context, next) => {
    await next();
    logger_1.default.info({
        request: {
            date: (0, date_1.getFullDate)(),
            method: context.method,
            path: context.path,
            body: context.request.body
        },
        response: { status: context.status, body: context.body }
    });
};
exports.logRequestsMiddleware = logRequestsMiddleware;
//# sourceMappingURL=log-request.js.map