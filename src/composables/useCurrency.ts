import { onMounted, ref } from 'vue'
import { getCurrency } from '@/API/CurrencyAPI'

import type { Currency } from '@/interfaces/currency.interface'
import type { Exchange } from '@/interfaces/exchange.interface'
import type { CurrencyResponse } from '@/interfaces/currency-list.response'
import type { ExchangeResponse } from '@/interfaces/exchange-list.response'
// import type { ConvertResponse } from '@/interfaces/convert-list.response'
// import type { Convert } from '@/interfaces/convert.interface'

export const useCurrency = () => {
  const apiKey = import.meta.env.VITE_EXCHANGERATE_KEY as string

  const currencyList = ref<Currency>()
  const exchangeRates = ref<Exchange>()

  const getCurrencyData = async (): Promise<Currency> => {
    if (!apiKey) {
      throw new Error('API key is not set')
    }
    const response = await getCurrency.get<CurrencyResponse>(
      `/exchange-rates/currency_codes?access_key=${apiKey}`
    )
    if (response.status !== 200) {
      throw new Error('Failed to fetch crypto data')
    }
    return response.data.currency_codes
  }

  const getExchangeRates = async (): Promise<Exchange> => {
    const response = await getCurrency.get<ExchangeResponse>(
      `/exchange-rates/latest?access_key=${apiKey}`
    )
    if (response.status !== 200) {
      throw new Error('Failed to fetch crypto data')
    }
    return response.data.rates
  }

  // const convertToUSD = async (amount: number, currencyToConvert: string): Promise<Convert> => {
  //   const response = await getCurrency.get<ConvertResponse>(
  //     `/exchange-rates/convert?access_key=${apiKey}&from=${currencyToConvert}&to=USD&amount=${amount}`
  //   )
  //   if (response.status !== 200) {
  //     throw new Error('Failed to fetch crypto data')
  //   }
  //   return response.data
  // }

  onMounted(async () => {
    currencyList.value = await getCurrencyData()
    exchangeRates.value = await getExchangeRates()
  })

  return {
    currencyList,
    exchangeRates
  }
}
