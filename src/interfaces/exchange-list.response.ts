export interface ExchangeResponse {
  base: string
  success: boolean
  date: Date
  rates: { [key: string]: number }
}
