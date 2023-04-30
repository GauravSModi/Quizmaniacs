/**
 * Front end code adapted from username fdomgjoni99 
 * https://github.com/fdomgjoni99/trivia-go
 */
import { createApp } from 'vue';
import App from './App.vue';
import './index.css';
import router from "./router";

const app = createApp(App);
app.use(router);

app.mount('#app');
