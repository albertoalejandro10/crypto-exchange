<template>
  <div class="rounded-b-lg border-t border-gray-200 px-4 py-2">
    <ol class="flex justify-end gap-1 text-xs font-medium">
      <li>
        <button
          @click="$emit('updatePage', currentPage - 1)"
          :disabled="currentPage === 1"
          class="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900"
        >
          <span class="sr-only">Prev Page</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-3 w-3"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </li>

      <li>
        <span
          class="block w-12 h-8 rounded border border-gray-100 bg-white text-center leading-8 text-gray-900"
        >
          {{ currentPage }} / {{ totalPages }}
        </span>
      </li>

      <li>
        <button
          @click="$emit('updatePage', currentPage + 1)"
          :disabled="currentPage === totalPages"
          class="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900"
        >
          <span class="sr-only">Next Page</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-3 w-3"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </li>
    </ol>
  </div>
</template>

<script setup lang="ts">
defineProps({
  currentPage: {
    type: Number,
    required: true
  },
  totalPages: {
    type: Number,
    required: true
  }
})
</script>

<style scoped>
button {
  @apply disabled:opacity-50 disabled:cursor-not-allowed;
}
</style>
