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
        <SelectCurrency @currency-changed="handleCurrencyChange" />
        <button
          class="inline-block rounded border border-green-600 bg-green-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-green-600 focus:outline-none focus:ring focus:ring-green-500 active:text-green-500"
          @click="handleButtonStateClick"
        >
          {{ buttonText }}
        </button>
        <InputCurrency
          :usd-value="Number(assetData.priceUsd)"
          :current-currency="currencyKey"
          :state="state"
          @exchange-changed="handleExchangeChange"
        />
        <p v-if="exchangeValue !== 0" class="text-center text-gray-800 text-sm tracking-wide">
          <span v-if="!state">{{ formatter.format(exchangeValue) }}</span>
          <span v-else>{{ cryptoFormatter(exchangeValue) }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { FlowerSpinner } from 'epic-spinners'

import { useAsset } from '@/composables/useAsset'

import SelectCurrency from '@/components/SelectCurrency.vue'
import StatCrypto from '@/components/StatCrypto.vue'
import InputCurrency from '@/components/InputCurrency.vue'

const { isLoading, assetData } = useAsset()

const returnImage = () => {
  return `https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/icon/${assetData.value?.symbol!.toLowerCase()}.png`
}

const currencyKey = ref('USD')
const handleCurrencyChange = (currency: string) => {
  // console.log('Currency changed to:', currency)
  exchangeValue.value = 0
  currencyKey.value = currency
}

// It is false by default, so the exchange is Crypto to currency
// It is true, the exchange is currency to Crypto
const state = ref(false)
const handleButtonStateClick = () => {
  // console.log('Button state changed to:', !state.value)
  exchangeValue.value = 0
  state.value = !state.value
}

const buttonText = computed(() => {
  return state.value
    ? `Exchange: ${currencyKey.value} to ${assetData.value?.symbol}`
    : `Exchange: ${assetData.value?.symbol} to ${currencyKey.value}`
})

const exchangeValue = ref(0)
const handleExchangeChange = (value: number) => {
  // console.log('Exchange changed to:', value)
  exchangeValue.value = value
}

const formatter = computed(
  () =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyKey.value,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })
)

const cryptoFormatter = computed(() => {
  const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })

  return (value: number) => {
    return `${formatter.format(value)} ${assetData.value?.symbol}`
  }
})
</script>
