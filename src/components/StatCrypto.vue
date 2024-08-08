<template>
  <article class="rounded-lg border border-gray-100 bg-white p-4">
    <div>
      <p class="text-sm text-gray-500">{{ title }}</p>
      <p class="text-2xl font-medium text-gray-800">
        {{ type === 'dollar' ? dollar(price!) : percent(price!) }}
      </p>
    </div>
  </article>
</template>

<script setup lang="ts">
defineProps<{
  title?: string
  price?: string
  type?: string
}>()

import { dollar, percent } from '@/filters/dollar'
</script>
