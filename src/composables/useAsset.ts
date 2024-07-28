import { computed, onMounted, ref } from 'vue'

import { getCryptoData } from '@/API/CryptoAPI'

import type { AssetResponse } from '@/interfaces/asset-list.response'
import type { Asset } from '@/interfaces/asset.interface'
import router from '@/router'

export const useAsset = () => {
  const assetData = ref<Asset | null>(null)
  const coin = ref<string>(router.currentRoute.value.params.coin as string)

  const isLoading = computed(() => assetData.value === null)
  const getCryptoDataByCoin = async (coin: string): Promise<Asset> => {
    const response = await getCryptoData.get<AssetResponse>(`/assets/${coin}`)
    if (response.status !== 200) {
      throw new Error('Failed to fetch crypto data')
    }
    return response.data.data
  }

  onMounted(async () => {
    assetData.value = await getCryptoDataByCoin(coin.value)
  })

  return {
    isLoading,
    assetData
  }
}
