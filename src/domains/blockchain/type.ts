export type Transaction = {
  amount: number
  sender: string
  recipient: string
}

export type Block = {
  blockNumber: number
  nonce: number
  timestamp: number
  transactions: Transaction[]
  hash: string
  previousBlockHash: string
}
