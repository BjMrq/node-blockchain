import Router from 'koa-router'
import Koa from 'koa'

import { healthSubRouter } from './health/health.routes'
import { apiVersion } from '../config/constants'
import { transactionsSubRouter } from './transactions/transactions.routes'
import { mineSubRouter } from './mine/mine.routes'
import { blockchainSubRouter } from './blockchain/blockchain.routes'
import { registerNodeSubRouter } from './register-node/register-node.routes'

const registerRouters = (app: Koa): Koa => {
  const router = new Router({
    prefix: `/api/${apiVersion}`
  })

  router.use(healthSubRouter())
  router.use(transactionsSubRouter())
  router.use(mineSubRouter())
  router.use(blockchainSubRouter())
  router.use(registerNodeSubRouter())

  app.use(router.routes()).use(router.allowedMethods())

  return app
}

export default registerRouters
