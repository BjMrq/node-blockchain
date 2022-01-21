import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import compress from 'koa-compress'
import helmet from 'koa-helmet'
import registerRouters from '../api'
import { errorMiddleware } from '../middlewares/global/error'
import { logRequestsMiddleware } from '../middlewares/global/log-request'
import { port } from './constants'
import { errorEvent, errorHandler } from './on-error'

export const startServer = () => {
  /**
   * Create app
   */
  const app = new Koa()

  /**
   * Register global middlewares
   */

  app
    // Provides security headers
    .use(helmet())
    // Configure cors
    // Parse the body request
    .use(bodyParser())
    // Log every requests
    .use(logRequestsMiddleware)
    // Handle trowed errors
    .use(errorMiddleware)
    // Allow compress
    .use(compress())

  /**
   * Register events
   */
  app.on(errorEvent, errorHandler)

  /**
   * Apply global router
   */
  registerRouters(app)

  /**
   * Start the app
   */
  app.listen(port)
}
