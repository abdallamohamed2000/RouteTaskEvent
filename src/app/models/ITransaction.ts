
export type allTransaction = ITransaction[]

export interface ITransaction {
  id: string
  customer_id: number
  date: string
  amount: number
}