"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Blockchain = void 0;
const crypto_1 = require("crypto");
const trampoline_1 = require("./trampoline");
class Blockchain {
    chain;
    pendingTransactions;
    hashingDifficulty;
    constructor() {
        this.chain = [
            {
                blockNumber: 1,
                timestamp: Date.now(),
                nonce: 2000,
                hash: '0',
                transactions: [],
                previousBlockHash: '0'
            }
        ];
        this.pendingTransactions = [];
        this.hashingDifficulty = '000000';
    }
    addNewBlockToTheChain(createdBlock) {
        this.chain.push(createdBlock);
    }
    capturePendingTransactions() {
        const capturedTransactions = [...this.pendingTransactions];
        this.pendingTransactions = [];
        return capturedTransactions;
    }
    getLastBlock() {
        return this.chain.at(-1);
    }
    getNextBlockNumber() {
        const lastBlock = this.getLastBlock();
        return lastBlock['blockNumber'] + 1;
    }
    hashBlock(previousBlockHash, currentBlockTransactions, nonce) {
        return (0, crypto_1.createHash)('sha256')
            .update(`${previousBlockHash}${JSON.stringify(currentBlockTransactions)}${String(nonce)}`)
            .digest('hex');
    }
    findHashForNewBlock(previousBlockHash, currentBlockTransactions, nonce = 0) {
        const possibleHash = this.hashBlock(previousBlockHash, currentBlockTransactions, nonce);
        if (possibleHash.startsWith(this.hashingDifficulty))
            return { hash: possibleHash, nonce };
        return () => this.findHashForNewBlock(previousBlockHash, currentBlockTransactions, nonce + 1);
    }
    isValidBlock(blockToVerify) {
        const blockHash = this.hashBlock(blockToVerify.previousBlockHash, blockToVerify.transactions, blockToVerify.nonce);
        return blockHash === blockToVerify.hash && blockHash.startsWith(this.hashingDifficulty);
    }
    changeDifficultyFor(newHashingDifficulty) {
        this.hashingDifficulty = newHashingDifficulty;
    }
    createNewBlock(previousBlockHash, blockHash, nonce) {
        const createdBlock = {
            blockNumber: this.chain.length + 1,
            timestamp: Date.now(),
            nonce,
            transactions: this.capturePendingTransactions(),
            hash: blockHash,
            previousBlockHash
        };
        this.addNewBlockToTheChain(createdBlock);
        return createdBlock;
    }
    createTransaction(sender, recipient, amount) {
        const createdTransaction = { sender, recipient, amount };
        this.pendingTransactions.push(createdTransaction);
        return { blockNumber: this.getNextBlockNumber(), transaction: createdTransaction };
    }
    proofOfWork(previousBlockHash, currentBlockTransactions) {
        return (0, trampoline_1.trampoline)(this.findHashForNewBlock.bind(this)).bind(this)(previousBlockHash, currentBlockTransactions);
    }
}
exports.Blockchain = Blockchain;
//# sourceMappingURL=blockchain.js.map