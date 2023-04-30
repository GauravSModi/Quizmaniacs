import { createRouter, createWebHistory } from 'vue-router';
import Homepage from '../components/HomePage.vue';
import LoginPage from '../components/LoginPage.vue';
import SignupPage from '../components/SignupPage.vue';
import MainPage from '../components/MainPage.vue';
import TestUi from '../components/TestUi.vue';
import ProfilePage from '../components/ProfilePage.vue';
import CreateQuiz from '../components/CreateQuiz.vue';
import Quiz from '../components/Quiz.vue';
import ResetPasswordPage from '../components/ResetPasswordPage.vue' 

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Homepage,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage,
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignupPage,
    },
    {
      path: '/reset',
      name: 'reset',
      component: ResetPasswordPage,
    },
    {
      path: '/teacher',
      name: 'teacher',
      component: MainPage,
    },
    {
      path: '/test',
      name: 'test',
      component: MainPage,
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfilePage,
    },
    {
      path: '/student',
      name: 'student',
      component: MainPage,
    },
    {
      path: '/main',
      name: 'main',
      component: MainPage,
    },
    {
      path: '/student/quiz/:quizId',
      name: 'quiz',
      component: Quiz,
    },
    {
      path: '/teacher/quiz/',
      name: 'CreateQuiz',
      component: CreateQuiz,
    },
  ],
});

export default router;
