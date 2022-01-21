import { createHash } from 'crypto'
import { trampoline } from '../../utils/trampoline'
import { Block, Transaction } from './type'

export class Blockchain {
  public chain: Block[]
  public pendingTransactions: Transaction[]

  public blockChainAddress = '0000'
  public miningReward = 5
  public hashingDifficulty: string

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
    ]
    this.pendingTransactions = []
    this.hashingDifficulty = '0000'
  }

  private addNewBlockToTheChain(createdBlock: Block) {
    this.chain.push(createdBlock)
  }

  private capturePendingTransactions() {
    const capturedTransactions = [...this.pendingTransactions]
    this.pendingTransactions = []
    return capturedTransactions
  }

  public getLastBlock(): Block {
    return this.chain.at(-1) as Block
  }

  private getNextBlockNumber(): number {
    const lastBlock = this.getLastBlock()
    return lastBlock['blockNumber'] + 1
  }

  private async hashBlock(previousBlockHash: string, currentBlockTransactions: Transaction[], nonce: number) {
    return createHash('sha256')
      .update(`${previousBlockHash}${JSON.stringify(currentBlockTransactions)}${String(nonce)}`)
      .digest('hex')
  }

  private async findHashForNewBlock(previousBlockHash: string, currentBlockTransactions: Transaction[], nonce = 0) {
    const possibleHash = await this.hashBlock(previousBlockHash, currentBlockTransactions, nonce)

    if (possibleHash.startsWith(this.hashingDifficulty)) return { hash: possibleHash, nonce }
    return () => this.findHashForNewBlock(previousBlockHash, currentBlockTransactions, nonce + 1)
  }

  public async isValidBlock(blockToVerify: Block) {
    const blockHash = await this.hashBlock(
      blockToVerify.previousBlockHash,
      blockToVerify.transactions,
      blockToVerify.nonce
    )
    return blockHash === blockToVerify.hash && blockHash.startsWith(this.hashingDifficulty)
  }

  public changeDifficultyFor(newHashingDifficulty: string) {
    this.hashingDifficulty = newHashingDifficulty
  }

  public createNewBlock(previousBlockHash: string, blockHash: string, nonce: number): Block {
    const createdBlock = {
      blockNumber: this.chain.length + 1,
      timestamp: Date.now(),
      nonce,
      transactions: this.capturePendingTransactions(),
      hash: blockHash,
      previousBlockHash
    }

    this.addNewBlockToTheChain(createdBlock)

    return createdBlock
  }

  public createTransaction(
    sender: string,
    recipient: string,
    amount: number
  ): { transaction: Transaction; blockNumber: number } {
    const createdTransaction = { sender, recipient, amount }

    this.pendingTransactions.push(createdTransaction)

    return { blockNumber: this.getNextBlockNumber(), transaction: createdTransaction }
  }

  public async proofOfWork(previousBlockHash: string, currentBlockTransactions: Transaction[]) {
    return await trampoline(this.findHashForNewBlock.bind(this)).bind(this)(previousBlockHash, currentBlockTransactions)
  }

  public createMiningRewardTransaction(minerAddress: string) {
    return this.createTransaction(this.blockChainAddress, minerAddress, this.miningReward)
  }
}

export const satiBlockchain = new Blockchain()
