import Joi from 'joi'
import { validateBodyRequest } from '../../../middlewares/wrappers/validate-request'
import { RequestSchema } from '../../../types'

export type CreateTransactionRequest = RequestSchema<{
  amount: number
  sender: string
  recipient: string
}>

export const createTransactionsRequest = validateBodyRequest(
  Joi.object({
    amount: Joi.number().required(),
    sender: Joi.string().required(),
    recipient: Joi.string().required()
  })
)
