import { Blockchain } from '../src/domains/blockchain/blockchain'

describe('Blockchain', () => {
  let blockchain: Blockchain

  beforeAll(() => {
    jest.useFakeTimers().setSystemTime(new Date('2000-01-01').getTime())
  })

  beforeEach(() => {
    blockchain = new Blockchain()
  })

  describe('createNewBlock', () => {
    it('create a new block and returns it', () => {
      expect(blockchain.createNewBlock('43565346546', '324534556', 1)).toStrictEqual({
        hash: '324534556',
        blockNumber: 2,
        nonce: 1,
        previousBlockHash: '43565346546',
        timestamp: 946_684_800_000,
        transactions: []
      })
    })

    it("create a new block and add it to it's chain", () => {
      blockchain.createTransaction('324534556', '43565346546', 20)
      blockchain.createTransaction('324534556', '43565346546', 10)

      const createdBlock = blockchain.createNewBlock('43565346546', '324534556', 1)

      expect(createdBlock).toStrictEqual({
        blockNumber: 2,
        hash: '324534556',
        nonce: 1,
        previousBlockHash: '43565346546',
        timestamp: 946_684_800_000,
        transactions: [
          {
            amount: 20,
            recipient: '43565346546',
            sender: '324534556'
          },
          {
            amount: 10,
            recipient: '43565346546',
            sender: '324534556'
          }
        ]
      })
      expect(blockchain.chain).toStrictEqual([
        {
          blockNumber: 1,
          hash: '0',
          nonce: 2000,
          previousBlockHash: '0',
          timestamp: 946_684_800_000,
          transactions: []
        },
        createdBlock
      ])
    })

    it('create a new block with pending transaction on it', () => {
      blockchain.createNewBlock('43565346546', '324534556', 1)
      blockchain.createNewBlock('324534556', '324534556', 1)
      blockchain.createNewBlock('324534556', '324534556', 1)

      expect(blockchain.chain.length).toStrictEqual(4)
    })
  })

  describe('createTransaction', () => {
    it('create a transaction and return it', () => {
      expect(blockchain.createTransaction('324534556', '43565346546', 20)).toStrictEqual({
        transaction: {
          amount: 20,
          recipient: '43565346546',
          sender: '324534556'
        },
        blockNumber: 2
      })
    })

    it("create a transaction and add it to it's pending transactions", () => {
      const createdTransaction = blockchain.createTransaction('324534556', '43565346546', 20)

      expect(blockchain.pendingTransactions).toStrictEqual([createdTransaction.transaction])
    })
  })

  describe('getLastBlock', () => {
    it('get last block of the chain and returns it', () => {
      blockchain.createNewBlock('43565346546', '324534556', 1)

      expect(blockchain['getLastBlock']()).toStrictEqual({
        hash: '324534556',
        blockNumber: 2,
        nonce: 1,
        previousBlockHash: '43565346546',
        timestamp: 946_684_800_000,
        transactions: []
      })
    })
  })

  describe('getNextBlockNumber', () => {
    it('get the next block number and returns it', () => {
      blockchain.createNewBlock('43565346546', '324534556', 1)

      expect(blockchain['getNextBlockNumber']()).toStrictEqual(3)
    })
  })

  describe('hashBlock', () => {
    it('create hash for a block', async () => {
      const createdTransaction = blockchain.createTransaction('324534556', '43565346546', 20)
      const createdTransaction2 = blockchain.createTransaction('324534556', '43565346546', 20)

      expect(
        await blockchain['hashBlock']('12323', [createdTransaction.transaction, createdTransaction2.transaction], 1)
      ).toStrictEqual('1ee83d6f28124db9715c4ab4723317a4cbb776ece432d84c53c02a145f517b32')
    })
  })

  describe('proofOfWork', () => {
    it('find hash for new block depending of difficulty', async () => {
      const createdTransaction = blockchain.createTransaction('324534556', '43565346546', 20)
      const createdTransaction2 = blockchain.createTransaction('324534556', '43565346546', 20)

      blockchain['hashingDifficulty'] = '0'

      expect(
        await blockchain.proofOfWork('12323', [createdTransaction.transaction, createdTransaction2.transaction])
      ).toStrictEqual({ hash: '02ef317d93e932a8d1429386984c724020596800294bda1310c643012f6ab192', nonce: 7 })
    })
  })

  describe('isValidBlock', () => {
    it('verify that a block is valid', async () => {
      const previousBlockHash = '12323'

      const createdTransaction = blockchain.createTransaction('324534556', '43565346546', 20)
      const createdTransaction2 = blockchain.createTransaction('324534556', '43565346546', 20)

      blockchain['hashingDifficulty'] = '0'

      const { hash, nonce } = await blockchain.proofOfWork(previousBlockHash, [
        createdTransaction.transaction,
        createdTransaction2.transaction
      ])

      const newBlock = blockchain.createNewBlock(previousBlockHash, hash, nonce)

      expect(await blockchain.isValidBlock(newBlock)).toStrictEqual(true)
      expect(await blockchain.isValidBlock({ ...newBlock, nonce: newBlock.nonce + 1 })).toStrictEqual(false)
      expect(await blockchain.isValidBlock({ ...newBlock, previousBlockHash: `0${previousBlockHash}` })).toStrictEqual(
        false
      )
    })
  })
})
