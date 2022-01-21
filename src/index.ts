import { appName, port } from './config/constants'
import logger from './config/logger'
import { startServer } from './config/server'

try {
  startServer()

  logger.info(`₿ ${appName} is listening on port ${port}, to the moon!`)
} catch (error) {
  logger.error('Unable to run the server because of the following error:')
  logger.error((error as Error).message)
}
