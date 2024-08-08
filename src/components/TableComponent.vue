<template>
  <div v-if="isLoading" class="flex justify-center items-center">
    <flower-spinner :animation-duration="2500" :size="120" color="#48bb78" />
  </div>
  <div v-else class="flex flex-col">
    <InputComponent class="w-full mb-2 sm:w-1/5" v-model="querySearch" />
    <div class="rounded-lg border border-gray-200">
      <div class="overflow-x-auto rounded-t-lg">
        <table class="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead>
            <tr>
              <th class="w-16 whitespace-nowrap px-4 py-3 font-medium text-gray-800">&nbsp;</th>
              <th class="w-16 whitespace-nowrap px-4 py-3 font-medium text-gray-800">Rank</th>
              <th class="w-1/2 whitespace-nowrap px-4 py-3 font-medium text-gray-800 text-left">
                Name
              </th>
              <th class="w-32 whitespace-nowrap px-4 py-3 font-medium text-gray-800 text-left">
                Price
              </th>
              <th class="w-32 whitespace-nowrap px-4 py-3 font-medium text-gray-800 text-left">
                Market Cap
              </th>
              <th class="w-32 whitespace-nowrap px-4 py-3 font-medium text-gray-800 text-left">
                24h Volume
              </th>
              <th class="w-44 whitespace-nowrap px-4 py-3">&nbsp;</th>
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
              <td class="whitespace-nowrap px-4 py-2 text-right">
                <RouterLink
                  class="inline-block rounded border border-green-600 bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-transparent hover:text-green-600 focus:outline-none focus:ring focus:ring-green-500 active:text-green-500"
                  :to="'/crypto/' + item.id"
                >
                  View Details
                </RouterLink>
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
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'

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

const querySearch = ref('')
watch(querySearch, (newValue) => {
  console.log(newValue)
})
</script>
