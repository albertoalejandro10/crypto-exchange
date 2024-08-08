<template>
  <div>
    <label for="Quantity" class="sr-only"> Value </label>

    <div class="flex items-center rounded border border-gray-200 justify-between">
      <button
        type="button"
        class="size-10 leading-10 text-gray-600 transition hover:opacity-75"
        @click="decrease"
        disabled
        :class="{ 'opacity-40': value <= 0 }"
      >
        <!-- :disabled="value <= 0" -->
        &minus;
      </button>

      <input
        type="number"
        id="Quantity"
        :value="value"
        @input="calculateValue"
        placeholder="Enter amount"
        class="h-10 w-full text-gray-600 border-transparent text-center [-moz-appearance:_textfield] sm:text-sm [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
      />

      <button
        disabled
        type="button"
        class="size-10 leading-10 text-gray-600 transition hover:opacity-75"
        @click="increase"
      >
        &plus;
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useCurrency } from '@/composables/useCurrency'

const props = defineProps<{
  usdValue: number
  state: boolean
  currentCurrency: string
}>()

const value = ref<number>(0)
const decrease = () => {
  value.value -= 1
}

const increase = () => {
  value.value += 1
}

const emit = defineEmits(['ExchangeChanged'])
const resultExchange = ref<number>()

const calculateValue = (event: Event) => {
  const target = event.target as HTMLInputElement
  let inputValue = target.value.replace(/^-/, '')

  if (!isNaN(Number(inputValue)) && inputValue !== '') {
    let exchange = Number(inputValue)

    if (props.currentCurrency !== 'USD') {
      exchange = exchangeActualCurrencyToUSD(Number(inputValue))
    }

    if (props.state) {
      resultExchange.value = exchangeUSDtoCrypto(exchange)
      emit('ExchangeChanged', resultExchange.value)
    } else {
      resultExchange.value = exchangeCryptoToUSD(exchange)
      emit('ExchangeChanged', resultExchange.value)
    }
    emit('ExchangeChanged', resultExchange.value)
  } else {
    value.value = 0
    emit('ExchangeChanged', 0)
  }
}

const { exchangeRates } = useCurrency()
const exchangeActualCurrencyToUSD = (inputValue: number): number => {
  const currentRate = exchangeRates.value?.[props.currentCurrency]
  if (!currentRate) return 0
  if (props.state) {
    return inputValue / currentRate
  } else {
    return inputValue * currentRate
  }
}

const exchangeUSDtoCrypto = (inputValue: number) => {
  let btc = inputValue / props.usdValue
  return btc
}

const exchangeCryptoToUSD = (inputValue: number) => {
  let usd = inputValue * props.usdValue
  return usd
}
</script>
