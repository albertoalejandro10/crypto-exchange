<template>
  <label
    for="choose-currency"
    class="block text-2xl font-bold text-gray-800 mb-1 text-center tracking-wider"
  >
    Choose your currency to convert
  </label>
  <select
    name="choose-currency"
    id="choose-currency"
    class="mt-1.5 rounded py-2 px-4 border border-gray-300 text-gray-700 sm:text-sm"
    v-model="selectedCurrency"
    @change="handleCurrencyChange"
  >
    <option v-for="(currency, key) in currencyList" :key="key" :value="key">
      {{ key }} - {{ currency }}
    </option>
  </select>
</template>

<script setup lang="ts">
import { useCurrency } from '@/composables/useCurrency'
import { ref } from 'vue'

const { currencyList } = useCurrency()
const selectedCurrency = ref('USD')

const emit = defineEmits(['CurrencyChanged'])
const handleCurrencyChange = () => {
  emit('CurrencyChanged', selectedCurrency.value)
}
</script>
