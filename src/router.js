import { getQuiz } from './utils/getCurrentQuiz.js';
import { initQuestionPage } from './pages/questionPage.js';
import { initWelcomePage } from './pages/welcomePage.js';

export function renderInitialPage(modal, pageWrapper) {
  const quiz = getQuiz();

  const hasProgress =
    quiz.currentQuestion > 0 ||
    quiz.questions.some((q) => q.userAnswer !== null || q.skipped);

  if (hasProgress && quiz.currentQuestion < quiz.questions.length) {
    initQuestionPage(quiz, pageWrapper, modal);
  } else {
    initWelcomePage(quiz, modal, pageWrapper);
  }
}
