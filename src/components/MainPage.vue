<script setup>
import Student from './Student.vue';
import Teacher from './Teacher.vue';
import Header from './Header.vue';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { auth } from '../firebaseConfig';
import { ref, onMounted, onUnmounted } from 'vue';
import { onAuthStateChanged } from '@firebase/auth';

const updateUser = httpsCallable(getFunctions(), 'updateUser');
const readUser = httpsCallable(getFunctions(), 'readUser');

let dispName = ref('');
let isTeacher = ref(false);


let unsubscribe = onAuthStateChanged(auth, (currUser) => {
  dispName.value = currUser.displayName;
  readUser({ userID: auth.currentUser.uid }).then((result) => {
    isTeacher.value = result.data.isTeacher;
  });
});


onUnmounted(() => unsubscribe());
</script>

<template>
  <Header></Header>
  <div
    class="w-11/12 mx-auto my-12 grid grid-cols-1 gap-y-8 lg:w-5/12 items-center justify-center"
  >
    <h1 class="text-center text-7xl my-12 font-bold">Hello, {{ dispName }}</h1>
    <div class="flex flex-col items-center">
      <Teacher v-if="isTeacher"/>
      <Student v-else/>
    </div>
  </div>
</template>
