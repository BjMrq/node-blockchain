"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_router_1 = __importDefault(require("koa-router"));
const health_routes_1 = require("./health/health.routes");
const constants_1 = require("../config/constants");
const transactions_routes_1 = require("./transactions/transactions.routes");
const mine_routes_1 = require("./mine/mine.routes");
const blockchain_routes_1 = require("./blockchain/blockchain.routes");
const register_node_routes_1 = require("./register-node/register-node.routes");
const registerRouters = (app) => {
    const router = new koa_router_1.default({
        prefix: `/api/${constants_1.apiVersion}`
    });
    router.use((0, health_routes_1.healthSubRouter)());
    router.use((0, transactions_routes_1.transactionsSubRouter)());
    router.use((0, mine_routes_1.mineSubRouter)());
    router.use((0, blockchain_routes_1.blockchainSubRouter)());
    router.use((0, register_node_routes_1.registerNodeSubRouter)());
    app.use(router.routes()).use(router.allowedMethods());
    return app;
};
exports.default = registerRouters;
//# sourceMappingURL=index.js.map