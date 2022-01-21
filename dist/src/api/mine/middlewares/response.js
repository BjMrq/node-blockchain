"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionCreated = void 0;
const blockchain_1 = require("../../../blockchain/blockchain");
const with_response_1 = __importDefault(require("../../../middlewares/wrappers/with-response"));
exports.transactionCreated = (0, with_response_1.default)(({ state: { validatedRequest } }) => {
    const transactionResult = blockchain_1.satiBlockchain.createTransaction(validatedRequest.sender, validatedRequest.recipient, validatedRequest.amount);
    return {
        body: {
            futureBlockNumber: transactionResult.blockNumber,
            transaction: transactionResult.transaction,
            status: 'PENDING'
        }
    };
});
//# sourceMappingURL=response.js.map