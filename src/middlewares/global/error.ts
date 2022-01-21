/* eslint-disable no-param-reassign */
import { Next, Context } from 'koa'
import { CustomError } from '../../config/errors'

/**
 * Return middleware that handle exceptions in Koa.
 * Dispose to the first middleware.
 *
 * @return {(context: Context, next: Next) => Promise<void>} Koa middleware.
 */
export const errorMiddleware = async (context: Context, next: Next): Promise<void> => {
  try {
    await next()
  } catch (error) {
    const catchedError = error as CustomError

    // Emit the error at the app level
    context.app.emit('error', error, context)

    context.status = catchedError.expose ? catchedError.status : 500
    context.body = {
      status: 'error',
      error: catchedError.expose ? catchedError.name : 'ServerError',

      message: catchedError.expose ? catchedError.message : 'Internal server error'
    }
  }
}
