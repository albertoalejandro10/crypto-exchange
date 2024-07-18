<template>
  <div v-if="isLoading" class="flex justify-center items-center">
    <flower-spinner :animation-duration="2500" :size="70" color="#48bb78" />
  </div>
  <div v-else class="rounded-lg border border-gray-200">
    <div class="overflow-x-auto rounded-t-lg">
      <table class="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
        <thead>
          <tr>
            <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-800">&nbsp;</th>
            <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-800">Rank</th>
            <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-800 text-left">Name</th>
            <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-800 text-left">Price</th>
            <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-800 text-left">
              Market Cap
            </th>
            <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-800 text-left">
              24h Volume
            </th>
            <th class="w-56 whitespace-nowrap px-4 py-2">
              <InputComponent class="hidden sm:block" />
            </th>
          </tr>
        </thead>

        <tbody class="divide-y divide-gray-200">
          <tr
            v-for="(item, index) in displayedCryptoData"
            :key="index"
            class="transition duration-300 ease-in-out hover:bg-green-50"
          >
            <td class="whitespace-nowrap text-center px-2 lg:px-4 py-2">
              <img :src="returnImage(item.symbol)" :alt="item.name!" class="w-6 h-6" />
            </td>
            <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-600 text-center">
              {{ item.rank }}
            </td>
            <td class="whitespace-nowrap px-4 py-2 text-gray-600">{{ item.name }}</td>
            <td class="whitespace-nowrap px-4 py-2 text-gray-600">{{ dollar(item.priceUsd) }}</td>
            <td class="whitespace-nowrap px-4 py-2 text-gray-600">
              {{ dollar(item.marketCapUsd) }}
            </td>
            <td
              class="whitespace-nowrap px-4 py-2 text-gray-600"
              :class="item.changePercent24Hr?.includes('-') ? 'text-red-800' : 'text-green-800'"
            >
              {{ percent(item.changePercent24Hr) }}
            </td>
            <td class="whitespace-nowrap px-4 py-2 text-center">
              <button
                class="text-xs font-medium text-gray-100 bg-green-800 hover:bg-green-900 px-2 py-2 rounded"
              >
                View Details
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <PaginationComponent
      :currentPage="currentPage"
      :totalPages="totalPages"
      @updatePage="(newPage) => (currentPage = newPage)"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

import { FlowerSpinner } from 'epic-spinners'

import PaginationComponent from '@/components/PaginationComponent.vue'
import InputComponent from '@/components/InputComponent.vue'

import { useCrypto } from '@/composables/useCrypto'
import { dollar, percent } from '@/filters/dollar'

const { cryptoData, isLoading } = useCrypto()

const returnImage = (symbol: string | null) => {
  return `https://static.coincap.io/assets/icons/${symbol!.toLowerCase()}@2x.png`
}

const currentPage = ref(1)
const itemsPerPage = ref(10)
const totalPages = computed(() => {
  return Math.ceil(cryptoData.value.length / itemsPerPage.value)
})

const displayedCryptoData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return cryptoData.value.slice(start, end)
})
</script>
