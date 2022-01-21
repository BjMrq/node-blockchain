import Joi from 'joi'
import { validateBodyRequest } from '../../../middlewares/wrappers/validate-request'
import { RequestSchema } from '../../../types'

export type MiningRequest = RequestSchema<{
  minerAddress: string
}>

export const miningRequest = validateBodyRequest(
  Joi.object({
    minerAddress: Joi.string().required()
  })
)
