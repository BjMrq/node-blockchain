"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionsSubRouter = void 0;
const koa_router_1 = __importDefault(require("koa-router"));
const blockchain_1 = require("../../blockchain/blockchain");
const with_response_1 = __importDefault(require("../../middlewares/wrappers/with-response"));
const request_1 = require("./middlewares/request");
const transactionsSubRouter = () => {
    const router = new koa_router_1.default({
        prefix: '/transactions'
    });
    router.post('/', request_1.createTransactionsRequest, (0, with_response_1.default)(({ state: { validatedRequest } }) => {
        const transactionResult = blockchain_1.satiBlockchain.createTransaction(validatedRequest.sender, validatedRequest.recipient, validatedRequest.amount);
        return {
            body: {
                futureBlockNumber: transactionResult.blockNumber,
                transaction: transactionResult.transaction,
                status: 'PENDING'
            }
        };
    }));
    return router.routes();
};
exports.transactionsSubRouter = transactionsSubRouter;
//# sourceMappingURL=transactions.routes.js.map