"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blockchainSubRouter = void 0;
const koa_router_1 = __importDefault(require("koa-router"));
const blockchain_1 = require("../../domains/blockchain/blockchain");
const with_response_1 = __importDefault(require("../../middlewares/wrappers/with-response"));
const blockchainSubRouter = () => {
    const router = new koa_router_1.default({
        prefix: '/blockchain'
    });
    router.get('/', (0, with_response_1.default)({
        status: 200,
        body: {
            chain: blockchain_1.satiBlockchain.chain,
            pendingTransactions: blockchain_1.satiBlockchain.pendingTransactions,
            currentHashingDifficulty: blockchain_1.satiBlockchain.hashingDifficulty
        }
    }));
    return router.routes();
};
exports.blockchainSubRouter = blockchainSubRouter;
//# sourceMappingURL=blockchain.routes.js.map