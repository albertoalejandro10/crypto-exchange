<template>
  <div class="min-h-screen">
    <section>
      <HeaderApp :links="links" />
    </section>
    <main
      class="flex flex-col justify-center align-center container mx-auto h-[calc(100vh-5rem)] px-4 sm:px-6 lg:px-8"
    >
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import HeaderApp from '@/components/HeaderComponent.vue'

const links = [
  {
    title: 'BTC'
  },
  {
    title: 'ETH'
  },
  {
    title: 'USDT'
  }
]
</script>
