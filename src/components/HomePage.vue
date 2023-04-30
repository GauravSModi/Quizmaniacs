/** * Front end code adapted from username fdomgjoni99 *
https://github.com/fdomgjoni99/trivia-go */

<script setup>
import { RouterLink, RouterView } from 'vue-router';
import AuthUi from './AuthUi.vue';
import Header from './Header.vue';
</script>

<template>
  <Header></Header>
  <div class="w-11/12 mx-auto grid grid-cols-1 gap-y-8 lg:w-5/12">
    <h1 class="text-center text-7xl my-12 font-bold">Quizmaniacs</h1>

    <RouterLink to="/login">
      <button
        class="px-12 py-4 bg-gray-600 text-white text-lg rounded-lg hover:bg-gray-700 transition w-full"
      >
        Log In
      </button>
    </RouterLink>

    <RouterLink to="/signup">
      <button
        class="px-12 py-4 bg-gray-600 text-white text-lg rounded-lg hover:bg-gray-700 transition w-full"
      >
        Sign Up
      </button>
    </RouterLink>
  </div>
</template>
