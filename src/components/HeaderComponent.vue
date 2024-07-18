<template>
  <header class="bg-black/90">
    <div class="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-4 lg:px-8">
      <div class="sm:flex sm:items-center sm:justify-between">
        <div class="flex justify-center items-center gap-x-4 text-center sm:text-left">
          <span class="icon-[hugeicons--exchange-02] text-3xl text-green-500"></span>
          <h1 class="text-xl font-bold text-gray-200 sm:text-2xl">Crypto Exchange</h1>
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
        <a
          href="https://albertoalejandro10.netlify.app"
          target="_blank"
          class="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center"
        >
          <button
            class="inline-flex items-center justify-center gap-1.5 rounded-lg border border-gray-200 bg-white px-5 py-3 text-gray-500 transition hover:text-gray-700 focus:outline-none focus:ring"
          >
            <span class="text-sm font-medium"> View Creator Website </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </button>
        </a>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import type { Link } from '@/interfaces/Link'

interface Props {
  links: Link[]
}
defineProps<Props>()
</script>
