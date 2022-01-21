import { randomUUID } from 'crypto'
import { hostname } from 'os'

export const apiVersion = 'v1'

export const port = 3000

export const httpResponses = {
  ok: 200,
  updated: 201,
  error: 500,
  unauthorized: 400
}

export const blockchainName = 'sati'

export const appName = `${blockchainName}-blockchain-api`

export const stateKeys = {
  helpers: 'helpers',
  records: 'records',
  transactions: 'transactions',
  jwtPayload: 'jwtPayload',
  validatedRequest: 'validatedRequest'
} as const

export const nodeHostname = hostname()

export const nodeAddress = randomUUID().replaceAll('-', '')
