import { initWelcomePage } from './pages/welcomePage.js';
import { getCurrentQuiz } from './state/quizState.js';
import {quizData} from "./data.js";

const loadApp = () => {
  const quizId = getCurrentQuiz();
  const quiz = quizData.find((q) => q.id === quizId);
  if (quiz) {
    initWelcomePage(quiz);
  }
};

window.addEventListener('load', loadApp);
