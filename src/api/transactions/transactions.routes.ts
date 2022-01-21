import Router from 'koa-router'
import { satiBlockchain } from '../../domains/blockchain/blockchain'
import { Transaction } from '../../domains/blockchain/type'
import withResponse from '../../middlewares/wrappers/with-response'
import { createTransactionsRequest } from './middlewares/request'
import { CreateTransactionRequest } from './middlewares/request'

export const transactionsSubRouter = (): Router.IMiddleware => {
  const router = new Router({
    prefix: '/transactions'
  })

  router.post(
    '/',
    createTransactionsRequest,
    withResponse<
      {
        transaction: Transaction
        futureBlockNumber: number
        status: 'PENDING'
      },
      CreateTransactionRequest
    >(({ state: { validatedRequest } }) => {
      const transactionResult = satiBlockchain.createTransaction(
        validatedRequest.sender,
        validatedRequest.recipient,
        validatedRequest.amount
      )

      return {
        body: {
          futureBlockNumber: transactionResult.blockNumber,
          transaction: transactionResult.transaction,
          status: 'PENDING'
        }
      }
    })
  )

  return router.routes()
}
