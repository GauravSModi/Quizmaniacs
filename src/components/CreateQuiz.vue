<script>
import { ref, onUnmounted } from 'vue';
import { auth } from '../firebaseConfig';
import { RouterLink } from 'vue-router';
import { httpsCallable, getFunctions } from 'firebase/functions';
import Header from './Header.vue';

export default {
  components: {
    Header,
  },
  setup() {
    const submitted = ref(false);
    const quizId = ref('');
    const quizName = ref('');
    const questions = ref([
      {
        question: '',
        options: [{ value: '' }, { value: '' }, { value: '' }, { value: '' }],
        selectedOptionIndex: null,
      },
    ]);

    const addQuestion = () => {
      questions.value.push({
        question: '',
        options: [{ value: '' }, { value: '' }, { value: '' }, { value: '' }],
        selectedOptionIndex: null,
      });
    };

    const submitQuiz = async () => {
      // do something with quiz data

      const quizQuestions = questions.value.map((question) => {
        return {
          correctAnswer: question.options[question.selectedOptionIndex].value,
          incorrectAnswers: question.options
            .filter((option, index) => index !== question.selectedOptionIndex)
            .map((option) => option.value),
          question: question.question,
        };
      });

      const quiz = {
        name: quizName.value,
        quizQuestions: quizQuestions,
        userId: auth.currentUser.uid,
      };

      const createQuiz = httpsCallable(getFunctions(), 'createQuiz');
      const quizResult = await createQuiz(quiz);
      quizId.value = quizResult.data.quizId;
      submitted.value = true;
    };

    return {
      quizName,
      questions,
      addQuestion,
      submitQuiz,
      quizId,
    };
  },
};
</script>

<template>
  <Header></Header>
  <div class="w-11/12 mx-auto grid grid-cols-1 gap-y-8 lg:w-5/12 pb-9">
    <div v-if="!quizId">
      <h2 class="text-center text-7xl my-7 font-bold">Create a Quiz</h2>
      <form @submit.prevent="submitQuiz" class="grid grid-cols-1 gap-y-8">
        <div class="flex flex-col">
          <label class="font-bold" for="quiz-name">Quiz Name:</label>
          <input
            type="text"
            id="quiz-name"
            v-model="quizName"
            required
            class="rounded-md border-2 border-gray-600 p-1"
          />
        </div>
        <div v-for="(question, index) in questions" :key="index">
          <h3 class="text-center text-5xl font-bold">
            Question {{ index + 1 }}
          </h3>
          <div class="flex flex-col my-5">
            <label :for="'question-' + index">Question:</label>
            <input
              :id="'question-' + index"
              type="text"
              v-model="question.question"
              class="rounded-md border-2 border-gray-600 p-1"
              required
            />
          </div>
          <div
            class="flex flex-col my-3"
            v-for="(option, optionIndex) in question.options"
            :key="optionIndex"
          >
            <label :for="'option-' + index + '-' + optionIndex"
              >Option {{ optionIndex + 1 }}:</label
            >
            <div class="flex flex-row justify-between">
              <input
                :id="'option-' + index + '-' + optionIndex"
                type="text"
                v-model="option.value"
                class="rounded-md border-2 border-gray-600 p-1 w-3/4"
                required
              />
              <div class="flex flex-row items-center gap-x-1">
                Correct Answer ?
                <input
                  :id="'option-' + index + '-' + optionIndex"
                  type="radio"
                  :value="optionIndex"
                  v-model="question.selectedOptionIndex"
                  required
                />
              </div>
            </div>
          </div>
        </div>
        <button
          type="button"
          @click="addQuestion"
          class="px-12 py-4 bg-gray-600 text-white text-lg rounded-lg hover:bg-gray-700 transition w-full"
        >
          Add Question
        </button>
        <button
          class="px-12 py-4 bg-gray-600 text-white text-lg rounded-lg hover:bg-gray-700 transition w-full"
          type="submit"
        >
          Create Quiz
        </button>
      </form>
    </div>
    <div v-else class="flex flex-col items-center align-middle my-12 justify-center">
      <h2 class="text-center text-7xl my-4 font-bold">Quiz ID</h2>
      <p class="text-center text-5 my-7">{{ quizId }}</p>
      <RouterLink to="/main">
        <button
          class="bg-gray-200 rounded-lg px-12 py-4 md:text-lg hover:bg-gray-300 transition"
        >
          <div class="flex items-center">
            <span class="mr-3">Back to Homepage</span
            ><svg
              width="24"
              height="24"
              xmlns="http://www.w3.org/2000/svg"
              fill-rule="evenodd"
              clip-rule="evenodd"
              fill="#444"
            >
              <path
                d="M8 6.012h-6.58l1.935-6.012 1.718 2.223c1.958-1.389 4.346-2.211 6.927-2.211 6.623 0 12 5.377 12 12s-5.377 11.988-12 11.988-12-5.365-12-11.988c0-1.036.132-2.041.379-3h2.079c-.297.947-.458 1.955-.458 3 0 5.52 4.481 10 10 10 5.52 0 10-4.48 10-10 0-5.519-4.48-10-10-10-2.121 0-4.083.668-5.703 1.796l1.703 2.204zm4 1.988c2.208 0 4 1.792 4 4s-1.792 4-4 4-4-1.792-4-4 1.792-4 4-4z"
              />
            </svg>
          </div>
        </button>
      </RouterLink>
    </div>
  </div>
</template>
