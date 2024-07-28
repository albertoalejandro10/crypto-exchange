<template>
  <header class="bg-black/90">
    <div class="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-4 lg:px-8">
      <div class="sm:flex sm:items-center sm:justify-between">
        <div class="flex justify-center items-center gap-x-4 text-center sm:text-left">
          <RouterLink class="flex items-center gap-x-2" to="/">
            <span class="icon-[hugeicons--exchange-02] text-3xl text-green-500"></span>
            <h1 class="text-xl font-bold text-gray-200 sm:text-2xl">Crypto Exchange</h1>
          </RouterLink>
          <div class="flex gap-x-4">
            <button
              class="hidden sm:block text-xs font-thin text-gray-100"
              v-for="(item, index) in links"
              :key="index"
            >
              {{ item.title }}
            </button>
          </div>
        </div>
        <div class="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
          <CreatorButtonComponent />
          <GitHubButtonComponent />
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import CreatorButtonComponent from './CreatorButtonComponent.vue'
import GitHubButtonComponent from './GitHubButtonComponent.vue'
import type { Link } from '@/interfaces/Link'

interface Props {
  links: Link[]
}
defineProps<Props>()
</script>
