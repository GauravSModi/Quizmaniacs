<script setup>
import { ref } from 'vue';
import { initializeApp } from 'firebase/app';
import { auth } from '../firebaseConfig';
import {
  getAuth,
  EmailAuthProvider,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';
import { useRouter, useRoute } from 'vue-router'

const router = useRouter();
const route = useRoute();

// FirebaseUI config
const uiConfig = {
  credentialHelper: firebaseui.auth.CredentialHelper.NONE,
  signInOptions: [
    // Email / Password Provider.
    EmailAuthProvider.PROVIDER_ID,
  ],
  callbacks: {
    signInSuccessWithAuthResult: function (authResult, redirectUrl) {
      // Handle sign-in.
      // Return false to avoid redirect.
      return false;
    },
  },
  signInSuccessUrl: 'http://localhost:3000/login',
};

const ui = new firebaseui.auth.AuthUI(auth);

if (!auth.currentUser) {
  ui.start('#firebaseui-auth-container', uiConfig);
}

onAuthStateChanged(auth, (user) => {
  
  if(user.currentUser) {
    router.push("/login");
  } else {
    router.push("/")
  }
})
</script>

<template>
  <section id="firebaseui-auth-container"></section>
</template>
