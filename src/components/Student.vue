<script setup>
import { ref, onMounted } from 'vue';
import { store } from '.././store';
import { useRouter } from 'vue-router';

const router = useRouter();

const quiz_id = ref('');

const startQuiz = () => {
  store.startQuiz({
    quizId: quiz_id.value,
  });
    router.push("/student/quiz/" + quiz_id.value);
};
</script>

<template>
  <form
    @submit.prevent="startQuiz"
    class="flex flex-row justify-around gap-x-8"
  >
    <input
      class="rounded-md border-2 border-gray-600 p-1 w-96"
      type="quiz_id"
      name="quiz_id"
      v-model="quiz_id"
      placeholder="quiz id"
    />
    <button
      class="px-12 py-4 bg-gray-600 text-white text-lg rounded-lg hover:bg-gray-700 transition"
      type="submit"
      @click="startQuiz()"
    >
      Join Quiz
    </button>
  </form>
</template>
