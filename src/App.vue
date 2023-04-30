/**
 * Front end code adapted from username fdomgjoni99 
 * https://github.com/fdomgjoni99/trivia-go
 */
<script>
import Quiz from './components/Quiz.vue';
import Options from './components/Options.vue';
import Restart from './components/Restart.vue';
import Homepage from './components/HomePage.vue';
import Header from './components/Header.vue';
import { RouterLink, RouterView } from 'vue-router'
import { store } from './store';

export default {
  components: {
    Quiz,
    Options,
    Restart,
    Homepage,
    Header,
},
  data() {
    return {
      store,
    };
  },
};
</script>

<template>
  <div class="text-gray-700">
    <RouterView/>
  </div>
</template>

<style>
  body {
    font-family: 'Epilogue';
    background-color: #f9f9f9;
  }
  input,
  textarea,
  button,
  select,
  a {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }
</style>
