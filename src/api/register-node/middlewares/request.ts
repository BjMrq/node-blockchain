import Joi from 'joi'
import { validateBodyRequest } from '../../../middlewares/wrappers/validate-request'
import { RequestSchema } from '../../../types'

export type RegisterNodeRequest = RequestSchema<{
  nodeHostname: string
}>

export const registerNodeRequest = validateBodyRequest(
  Joi.object({
    nodeHostname: Joi.string().required()
  })
)
