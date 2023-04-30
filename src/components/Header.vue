<script setup>
import {
  getAuth,
  EmailAuthProvider,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useRouter, useRoute, RouterLink } from 'vue-router';
import { onUnmounted, ref, watch } from 'vue';

let toggleButtonVal = ref("");
let hiddenVal = ref("hidden");
let userProfileButtonVal = ref("");
let isUserLoggedIn = ref(false);
let homePageButtonVal = ref("");

const router = useRouter();

const toggleButtonClicked = () => {
  if (isUserLoggedIn.value){
    console.log("signing out");
    signOut(auth);
    alert("Signed out!");
    router.push("/");
  } else {
    console.log("routing to login");
    router.push("/login")
  }
}

let unsubscribe = onAuthStateChanged(auth, (user) => {
  if(user) {
    // User is signed in
    console.log("User is signed in");
    toggleButtonVal.value = "Sign Out";
    hiddenVal.value = "";
    userProfileButtonVal.value = "User Profile";
    homePageButtonVal.value = "Home";
    isUserLoggedIn.value = true;
  } else {
    console.log("User is logged out");
    hiddenVal.value = "hidden";
    toggleButtonVal.value = "Log in";
    homePageButtonVal.value = "";
    isUserLoggedIn.value = false;
  }
})

onUnmounted(() => unsubscribe());

let routeToProfilePage = () => {
  router.push("/profile");
}

let routeToMainPage = () => {
  router.push("/main");
}


</script>

<template>
  <div class="w-11/12 mx-auto flex flex-row gap-y-8 gap-x-8 lg:w-5/12 justify-between pb-4">
    <RouterLink to="/" class="text-center text-4xl my-5 font-bold">
      Quizmaniacs
    </RouterLink>
    <button class="ml-auto" :class="hiddenVal" @click="routeToMainPage">{{ homePageButtonVal }}</button>
    <button :class="hiddenVal" @click="routeToProfilePage">{{userProfileButtonVal}}</button>
    <button @click="toggleButtonClicked" class="">{{toggleButtonVal}}</button>
  </div>
</template>
