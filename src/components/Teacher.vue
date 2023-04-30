<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
  <RouterLink to="/teacher/quiz" class="flex flex-row justify-around gap-x-8">
    <button
      class="px-12 py-4 bg-gray-600 text-white text-lg rounded-lg hover:bg-gray-700 transition"
    >
      Create Quiz
    </button>
  </RouterLink>
</template>
