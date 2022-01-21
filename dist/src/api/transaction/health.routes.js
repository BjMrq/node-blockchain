"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.healthSubRouter = void 0;
const koa_router_1 = __importDefault(require("koa-router"));
const with_response_1 = __importDefault(require("../../middlewares/wrappers/with-response"));
const healthSubRouter = () => {
    const router = new koa_router_1.default({
        prefix: '/health'
    });
    router.get('/', (0, with_response_1.default)({ status: 200 }));
    return router.routes();
};
exports.healthSubRouter = healthSubRouter;
//# sourceMappingURL=health.routes.js.map