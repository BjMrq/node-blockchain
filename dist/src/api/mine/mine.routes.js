"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mineSubRouter = void 0;
const koa_router_1 = __importDefault(require("koa-router"));
const blockchain_1 = require("../../domains/blockchain/blockchain");
const constants_1 = require("../../config/constants");
const with_response_1 = __importDefault(require("../../middlewares/wrappers/with-response"));
const mineSubRouter = () => {
    const router = new koa_router_1.default({
        prefix: '/mine'
    });
    router.post('/', (0, with_response_1.default)(async () => {
        const { hash: lastBlockHash } = blockchain_1.satiBlockchain.getLastBlock();
        const { hash, nonce } = await blockchain_1.satiBlockchain.proofOfWork(lastBlockHash, blockchain_1.satiBlockchain.pendingTransactions);
        const minedBlock = blockchain_1.satiBlockchain.createNewBlock(lastBlockHash, hash, nonce);
        const miningRewardTransaction = blockchain_1.satiBlockchain.createMiningRewardTransaction(constants_1.nodeAddress);
        return { body: { minedBlock, miningRewardTransaction } };
    }));
    return router.routes();
};
exports.mineSubRouter = mineSubRouter;
//# sourceMappingURL=mine.routes.js.map