<script setup>
import Header from './Header.vue';
import { ref, watch, reactive, onBeforeMount, onMounted, onUnmounted } from 'vue';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { auth } from '../firebaseConfig';
import { useRouter, useRoute } from 'vue-router';
import {
EmailAuthProvider,
  onAuthStateChanged,
  reauthenticateWithCredential,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  updatePassword,
  updateProfile,
} from '@firebase/auth';
// TODO: Implement this
// Use a button to switch between edit mode
let currUser;
const router = useRouter();
const route = useRoute();

const readUser = httpsCallable(getFunctions(), 'readUser');
const updateUser = httpsCallable(getFunctions(), 'updateUser');

let loadingText = 'Loading...';
let uid = ref(loadingText);
let email = ref(loadingText);
let displayName = ref(loadingText);
let roleString = ref(loadingText);
let isTeacher = ref();

let populateVars = () => {
  console.log(currUser);
  uid.value = currUser.uid;
  email.value = currUser.email;
  displayName.value = currUser.displayName;
};

let populateRole = () => {
  console.log('calling populateRole');
  readUser({ userID: uid.value }).then((result) => {
    console.log(result.data.IsTeacher);
    isTeacher.value = result.data.isTeacher;
    roleString.value = result.data.isTeacher ? 'Teacher' : 'Student';
  });
};

let roleFormHidden = ref('hidden');
let roleEditBtnHidden = ref('hidden');
let roleSelection = ref();

let startEditRole = () => {
  console.log('In startEditRole function');
  roleString.value = '';
  roleFormHidden.value = '';
  roleEditBtnHidden.value = 'hidden';
};

let editRole = async () => {
  console.log('In editRole function');
  roleString.value = loadingText;
  roleFormHidden.value = 'hidden';
  roleEditBtnHidden.value = 'hidden';
  await updateUser({
    userID: uid.value,
    userType: roleSelection.value == 'Teacher' ? true : false,
  });
  await readUser({ userID: uid.value }).then((result) => {
    console.log(result.data.IsTeacher);
    isTeacher.value = result.data.isTeacher;
    roleString.value = result.data.isTeacher ? 'Teacher' : 'Student';
  });
  roleEditBtnHidden.value = '';
};

let emailFormHidden = ref('hidden');
let emailEditBtnHidden = ref('hidden');
let oldEmail = '';
let newEmail = ref('');
let password = ref('');

let startEditEmail = () => {
  oldEmail = email.value;
  email.value = '';
  emailFormHidden.value = '';
  emailEditBtnHidden.value = 'hidden';
};

let editEmail = async () => {
  try {
    let userCredential = EmailAuthProvider.credential(oldEmail, password.value);
    await reauthenticateWithCredential(currUser, userCredential);
    await updateEmail(currUser, newEmail.value);
    router.push('/');
    signOut(auth);
    alert('Email changed successfully! Please sign-in again');
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(
      'Email Update Error, Email Not Changed!' +
        '\n\n' +
        errorCode +
        '\n\n' +
        errorMessage
    );
  }
};

let nameFormHidden = ref('hidden');
let nameEditBtnHidden = ref('hidden');
let newName = ref('');

let startEditName = () => {
  displayName.value = '';
  nameFormHidden.value = '';
  nameEditBtnHidden.value = 'hidden';
};

let editName = async () => {
  await updateProfile(currUser, {
    displayName: newName.value,
  });
  displayName.value = currUser.displayName;
  nameEditBtnHidden.value = '';
  nameFormHidden.value = 'hidden';
};

let passwordFormHidden = ref('hidden');
let passwordEditBtnHidden = ref('hidden');
let currPassword = ref('');
let newPassword = ref('');

let startEditPassword = () => {
  passwordFormHidden.value = '';
  passwordEditBtnHidden.value = 'hidden';
};

let editPassword = async () => {
  try {
    let userCredential = EmailAuthProvider.credential(currUser.email, currPassword.value);
    await reauthenticateWithCredential(currUser, userCredential);
    await updatePassword(currUser, newPassword.value);
    router.push('/');
    signOut(auth);
    alert('Password changed successfully! Please sign-in again');
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(
      'Password Update Error, Email Not Changed!' +
        '\n\n' +
        errorCode +
        '\n\n' +
        errorMessage
    );
  }
};

let unhideButtons = () => {
  roleEditBtnHidden.value = '';
  emailEditBtnHidden.value = '';
  nameEditBtnHidden.value = '';
  passwordEditBtnHidden.value = '';
};

let unsubscribe = onAuthStateChanged(auth, (user) => {
  console.log('profile page onauthstatechanged');
  if (user != null) {
    currUser = auth.currentUser;
    populateVars();
    populateRole();
    unhideButtons();
  } else {
    router.push('/');
    alert('Not Signed In! Unable to access user profile page!');
  }
});

onUnmounted(() => {
  unsubscribe();
})
</script>

<template>
  <Header></Header>
  <div class="w-11/12 mx-auto grid grid-cols-1 gap-y-8 lg:w-5/12">
    <h3 class="text-center text-4xl mb-1 font-bold">User Profile</h3>

    <div class="flex">
      <p class="mb-1 text-2xl">Email: {{ email }}</p>
      <button
        class="ml-5 px-4 bg-gray-600 text-white text-sm rounded-lg hover:bg-gray-700 transition"
        :class="emailEditBtnHidden"
        @click="startEditEmail"
      >
        Edit Email
      </button>
      <form
        @submit.prevent="editEmail"
        class="flex flex-row mx-2 mb-1 text-base space-x-3"
        :class="emailFormHidden"
      >
        <div class="flex flex-col">
          <label for="newEmail" class="text-base">New Email Address:</label>
          <input
            class="rounded-md border-2 border-gray-600"
            type="text"
            name="newEmail"
            v-model="newEmail"
            placeholder="email@address.com"
            required
          />
        </div>
        <div class="flex flex-col">
          <label for="password" class="text-base">Password:</label>
          <input
            class="rounded-md border-2 border-gray-600"
            type="password"
            name="password"
            v-model="password"
            placeholder="email@address.com"
            required
          />
        </div>

        <button
          class="px-4 py-4 bg-gray-600 text-white text-sm rounded-lg hover:bg-gray-700 transition"
          type="submit"
        >
          Submit Changes
        </button>
      </form>
    </div>

    <div class="flex">
      <p class="mb-1 text-2xl">Display Name: {{ displayName }}</p>
      <button
        class="ml-5 px-4 bg-gray-600 text-white text-sm rounded-lg hover:bg-gray-700 transition"
        :class="nameEditBtnHidden"
        @click="startEditName"
      >
        Edit Display Name
      </button>
      <form
        @submit.prevent="editName"
        class="flex flex-row mx-2 mb-1 text-base space-x-3"
        :class="nameFormHidden"
      >
        <div class="flex flex-col">
          <label for="newName" class="text-base">New Display Name:</label>
          <input
            class="rounded-md border-2 border-gray-600"
            type="text"
            name="newName"
            v-model="newName"
            placeholder="Jane Doe"
            required
          />
        </div>

        <button
          class="px-4 py-4 bg-gray-600 text-white text-sm rounded-lg hover:bg-gray-700 transition"
          type="submit"
        >
          Submit Changes
        </button>
      </form>
    </div>

    <div class="flex">
      <p class="mb-1 text-2xl">Role: {{ roleString }}</p>
      <button
        class="ml-5 px-4 bg-gray-600 text-white text-sm rounded-lg hover:bg-gray-700 transition"
        :class="roleEditBtnHidden"
        @click="startEditRole"
      >
        Edit Role
      </button>
      <form
        @submit.prevent="editRole"
        class="flex flex-row mx-2 mb-1 text-2xl"
        :class="roleFormHidden"
      >
        <div class="mx-2">
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
          />
          <span> Student </span>
        </div>
        <button
          class="ml-5 px-4 py-4 bg-gray-600 text-white text-sm rounded-lg hover:bg-gray-700 transition"
          type="submit"
        >
          Submit Changes
        </button>
      </form>
    </div>
    <button
      class="px-4 py-4 bg-gray-600 text-white text-sm rounded-lg hover:bg-gray-700 transition w-1/4"
      :class="passwordEditBtnHidden"
      @click="startEditPassword"
    >
      Change Password
    </button>
    <form
      @submit.prevent="editPassword"
      class="flex flex-row mx-2 mb-1 text-base space-x-3"
      :class="passwordFormHidden"
    >
      <div class="flex flex-col">
        <label for="currPassword" class="text-base">Current Password:</label>
        <input
          class="rounded-md border-2 border-gray-600"
          type="password"
          name="currPassword"
          v-model="currPassword"
          placeholder="Current Password"
          required
        />
      </div>
      <div class="flex flex-col">
        <label for="newPassword" class="text-base">New Password:</label>
        <input
          class="rounded-md border-2 border-gray-600"
          type="password"
          name="newPassword"
          v-model="newPassword"
          placeholder="New Password"
          required
        />
      </div>

      <button
        class="px-4 py-4 bg-gray-600 text-white text-sm rounded-lg hover:bg-gray-700 transition"
        type="submit"
      >
        Submit Changes
      </button>
    </form>
  </div>
</template>
