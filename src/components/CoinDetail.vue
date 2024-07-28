<template>
  <div v-if="isLoading || assetData === null" class="flex justify-center items-center">
    <flower-spinner :animation-duration="2500" :size="120" color="#48bb78" />
  </div>
  <div v-else>
    <div class="grid grid-cols-1 gap-4 items-center lg:grid-cols-[120px_1fr] lg:gap-8">
      <div class="h-32 rounded-lg flex justify-center items-center">
        <img :src="returnImage()" :alt="assetData.name" class="w-28 h-28" />
      </div>
      <div>
        <h1 class="text-3xl font-bold text-gray-800 mb-1">
          {{ assetData.name }}
          <span class="text-xs text-bold text-gray-600"> {{ assetData.symbol }} </span>
          <strong class="text-gray-500 text-sm"> Rank: {{ assetData.rank }}</strong>
        </h1>
        <div class="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-8">
          <div class="h-24 rounded-xl bg-gray-800">
            <StatCrypto :title="'Price - USD'" :price="assetData.priceUsd" :type="'dollar'" />
          </div>
          <div class="h-24 rounded-xl bg-gray-800">
            <StatCrypto
              :title="'Market Capitalization - USD'"
              :price="assetData.marketCapUsd"
              :type="'dollar'"
            />
          </div>
          <div class="h-24 rounded-xl bg-gray-800">
            <StatCrypto :title="'Available Supply'" :price="assetData.supply" :type="'dollar'" />
          </div>
          <div class="h-24 rounded-xl bg-gray-800">
            <StatCrypto
              :title="'Change Percent 24h'"
              :price="assetData.changePercent24Hr"
              :type="'percent'"
            />
          </div>
          <div class="h-24 rounded-xl bg-gray-800">
            <StatCrypto
              :title="'24h Volume - USD'"
              :price="assetData.volumeUsd24Hr"
              :type="'dollar'"
            />
          </div>
        </div>
      </div>
    </div>
    <!-- Divider -->
    <span class="flex items-center">
      <span class="h-px flex-1 bg-gray-200 my-2"></span>
    </span>
    <!-- Second Section -->
    <div class="flex flex-row gap-4 items-center justify-center">
      <div class="flex flex-col gap-4 w-4/12">
        <SelectCurrency />
        <button
          class="inline-block rounded border border-green-600 bg-green-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-green-600 focus:outline-none focus:ring focus:ring-green-500 active:text-green-500"
        >
          USD to BTC
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FlowerSpinner } from 'epic-spinners'

import { useAsset } from '@/composables/useAsset'

import SelectCurrency from '@/components/SelectCurrency.vue'
import StatCrypto from '@/components/StatCrypto.vue'

const { isLoading, assetData } = useAsset()

const returnImage = () => {
  return `https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/icon/${assetData.value?.symbol!.toLowerCase()}.png`
}
</script>
