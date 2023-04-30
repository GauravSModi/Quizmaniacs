<script setup>
import { store } from '../store';
import { ref, watch } from 'vue';
import Header from './Header.vue';
import { auth } from '../firebaseConfig';
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from '@firebase/auth';
import { useRouter, useRoute } from 'vue-router';
import { getFunctions, httpsCallable } from 'firebase/functions';

const router = useRouter();

let email = ref('');

const reset = () => {
  sendPasswordResetEmail(auth, email.value)
    .then(() => {
      router.push('/');
      alert('Email to reset password is sent, please check your inbox.');
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert('Log in Error!: \n\n' + errorCode + ' \n\n' + errorMessage);
    });
};
</script>

<template>
  <Header></Header>
  <div class="w-11/12 mx-auto grid grid-cols-1 gap-y-8 lg:w-5/12">
    <h3 class="text-center text-4xl mb-1 font-bold">Reset Password</h3>

    <form @submit.prevent="reset" class="grid grid-cols-1 gap-y-8">
      <div class="flex flex-col">
        <label for="email">Email address:</label>
        <input
          class="rounded-md border-2 border-gray-600 p-1"
          type="text"
          name="email"
          v-model="email"
          placeholder="email@address.com"
          required
        />
      </div>

      <button
        class="px-12 py-4 bg-gray-600 text-white text-lg rounded-lg hover:bg-gray-700 transition w-full"
        type="submit"
      >
        Send Password Reset Email
      </button>
    </form>
  </div>
</template>
