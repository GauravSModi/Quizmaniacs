<script setup>
import { store } from '../store';
import Header from './Header.vue';
import { ref, watch } from 'vue';
import { auth } from '../firebaseConfig';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from '@firebase/auth';
import { useRouter, useRoute } from 'vue-router';
import { getFunctions, httpsCallable } from 'firebase/functions';
// TODO: Add the cloud functions to set the user profile after this

const router = useRouter();

let email = ref('');
let password = ref('');
let displayName = ref('');
let roleSelection = ref('');

const updateUser = httpsCallable(getFunctions(), 'updateUser');

const signup = () => {
  console.log('in signup function');
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      updateProfile(userCredential.user, {
        displayName: displayName.value,
      });
      let userProfParam = {
        userID: auth.currentUser.uid,
        userType: roleSelection.value == 'Teacher' ? true : false,
      };
      console.log(
        'userProfParam: ' + userProfParam.userID + ' ' + userProfParam.userType
      );
      updateUser(userProfParam).then((result) =>
        console.log('updateUser: ' + result.data.error)
      );

      alert('User Created');
      router.push('/main');
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode + '\n\n' + errorMessage);
      alert('Sign Up Error!' + '\n\n' + errorCode + '\n\n' + errorMessage);
    });
};
</script>

<template>
  <Header></Header>
  <div class="w-11/12 mx-auto grid grid-cols-1 gap-y-8 lg:w-5/12">
    <h3 class="text-center text-4xl mb-1 font-bold">Sign Up</h3>

    <form @submit.prevent="signup" class="grid grid-cols-1 gap-y-8">
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

      <div class="flex flex-col">
        <label for="password">Password:</label>
        <input
          class="rounded-md border-2 border-gray-600 p-1"
          type="password"
          name="password"
          v-model="password"
          placeholder="password123"
          required
        />
      </div>

      <div class="flex flex-col">
        <label for="name">Display Name:</label>
        <input
          class="rounded-md border-2 border-gray-600 p-1"
          type="text"
          name="name"
          v-model="displayName"
          placeholder="Jane Doe"
          required
        />
      </div>

      <div class="flex flex-col">
        <label for="role">Role:</label>
        <div>
          <div>
            <input
              type="radio"
              name="role"
              value="Teacher"
              v-model="roleSelection"
              required
            />
            <span> Teacher </span>
          </div>
          <div>
            <input
              type="radio"
              name="role"
              value="Student"
              v-model="roleSelection"
              checked
            />
            <span> Student </span>
          </div>
        </div>
      </div>

      <button
        class="px-12 py-4 bg-gray-600 text-white text-lg rounded-lg hover:bg-gray-700 transition w-full"
        type="submit"
      >
        Sign Up
      </button>
    </form>
  </div>
</template>
