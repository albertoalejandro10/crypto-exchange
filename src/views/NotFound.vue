<template>
  <p class="text-sm font-medium text-green-500">404 error</p>
  <h1 class="mt-3 text-2xl font-semibold text-gray-800 md:text-3xl">We can’t find that page</h1>
  <p class="mt-4 text-gray-500">
    Sorry, the page you are looking for doesn't exist or has been moved.
  </p>

  <div class="flex items-center mt-6 gap-x-3">
    <button
      class="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto hover:bg-gray-100"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-5 h-5"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
        />
      </svg>

      <span @click="$router.go(-1)">Go back</span>
    </button>

    <button
      class="w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-green-500 rounded-lg shrink-0 sm:w-auto hover:bg-green-600"
      @click="$router.push('/')"
    >
      Take me home
    </button>
  </div>
</template>

<script setup lang="ts"></script>
