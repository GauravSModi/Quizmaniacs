<script setup>
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  EmailAuthProvider,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import * as firebaseui from 'firebaseui';
import "firebaseui/dist/firebaseui.css";

let auth = getAuth();

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
};

const ui = new firebaseui.auth.AuthUI(auth);

if (!auth.currentUser) {
  ui.start('#firebaseui-auth-container', uiConfig);
}

// Listen to the current Auth state
// onAuthStateChanged(auth, (user) => {
//   if (user) {
//     startlogInButton.textContent = 'LOGOUT';
//     var userName = getUserName();
//     userNameElement.textContent = userName;
//     userNameElement.style.visibility = 'visible';
//   } else {
//     startlogInButton.textContent = "Let's quiz";
//     userNameElement.style.visibility = 'hidden';
//   }
// });
</script>

<template>
  <section id="firebaseui-auth-container"></section>
</template>
