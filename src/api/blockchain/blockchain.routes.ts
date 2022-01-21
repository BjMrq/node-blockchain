import Router from 'koa-router'
import { satiBlockchain } from '../../domains/blockchain/blockchain'
import { Block, Transaction } from '../../domains/blockchain/type'
import withResponse from '../../middlewares/wrappers/with-response'

export const blockchainSubRouter = (): Router.IMiddleware => {
  const router = new Router({
    prefix: '/blockchain'
  })

  router.get(
    '/',
    withResponse<{
      chain: Block[]
      pendingTransactions: Transaction[]
      currentHashingDifficulty: string
    }>({
      status: 200,
      body: {
        chain: satiBlockchain.chain,
        pendingTransactions: satiBlockchain.pendingTransactions,
        currentHashingDifficulty: satiBlockchain.hashingDifficulty
      }
    })
  )

  return router.routes()
}
