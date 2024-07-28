import { computed, onMounted, ref } from 'vue'

import type { Crypto } from '@/interfaces/crypto.interface'
import type { Asset } from '@/interfaces/asset.interface'
import type { CryptoResponse } from '@/interfaces/crypto-list.response'

import { getCryptoData } from '@/API/CryptoAPI'

export const useCrypto = () => {
  const cryptoData = ref<Crypto[]>([])
  const assetData = ref<Asset>()

  const isLoading = computed(() => cryptoData.value.length === 0)

  const getData = async (): Promise<Crypto[]> => {
    const response = await getCryptoData.get<CryptoResponse>('/assets?limit=100')
    if (response.status !== 200) {
      throw new Error('Failed to fetch crypto data')
    }

    const { data } = response.data
    const cryptoArray = data.map(
      ({ id, name, priceUsd, rank, symbol, marketCapUsd, changePercent24Hr }) => {
        return {
          id,
          name,
          priceUsd,
          rank,
          symbol,
          marketCapUsd,
          changePercent24Hr
        }
      }
    )
    return cryptoArray
  }

  onMounted(async () => {
    cryptoData.value = await getData()
  })

  return {
    cryptoData,
    assetData,
    isLoading
  }
}
