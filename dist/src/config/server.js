"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = void 0;
const koa_1 = __importDefault(require("koa"));
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
const koa_compress_1 = __importDefault(require("koa-compress"));
const koa_helmet_1 = __importDefault(require("koa-helmet"));
const api_1 = __importDefault(require("../api"));
const error_1 = require("../middlewares/global/error");
const log_request_1 = require("../middlewares/global/log-request");
const constants_1 = require("./constants");
const on_error_1 = require("./on-error");
const startServer = () => {
    const app = new koa_1.default();
    app
        .use((0, koa_helmet_1.default)())
        .use((0, koa_bodyparser_1.default)())
        .use(log_request_1.logRequestsMiddleware)
        .use(error_1.errorMiddleware)
        .use((0, koa_compress_1.default)());
    app.on(on_error_1.errorEvent, on_error_1.errorHandler);
    (0, api_1.default)(app);
    app.listen(constants_1.port);
};
exports.startServer = startServer;
//# sourceMappingURL=server.js.map