import { currentQuiz, quizData } from './data.js';
import { initWelcomePage } from './pages/welcomePage.js';
import { getCurrentQuiz } from './state/quizState.js';

const loadApp = () => {
  const quizId = getCurrentQuiz();
  const quiz = quizData.find((q) => q.id === quizId);
  if (quiz) {
    initWelcomePage(quiz);
  }
};

window.addEventListener('load', loadApp);
