import Router from 'koa-router'
import { satiBlockchain } from '../../domains/blockchain/blockchain'
import { Block, Transaction } from '../../domains/blockchain/type'
import { nodeAddress } from '../../config/constants'
import withResponse from '../../middlewares/wrappers/with-response'
import { MiningRequest } from './middlewares/request'

export const mineSubRouter = (): Router.IMiddleware => {
  const router = new Router({
    prefix: '/mine'
  })

  router.post(
    '/',
    withResponse<
      {
        minedBlock: Block
        miningRewardTransaction: {
          transaction: Transaction
          blockNumber: number
        }
      },
      MiningRequest
    >(async () => {
      //TODO compose the hell out of this
      const { hash: lastBlockHash } = satiBlockchain.getLastBlock()

      const { hash, nonce } = await satiBlockchain.proofOfWork(lastBlockHash, satiBlockchain.pendingTransactions)

      const minedBlock = satiBlockchain.createNewBlock(lastBlockHash, hash, nonce)

      const miningRewardTransaction = satiBlockchain.createMiningRewardTransaction(nodeAddress)

      return { body: { minedBlock, miningRewardTransaction } }
    })
  )

  return router.routes()
}
