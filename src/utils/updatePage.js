import { currentQuiz } from './getCurrentQuiz.js';
import { initWelcomePage } from '../pages/welcomePage.js';

export function updatePage(modal, pageWrapper) {
  const quiz = currentQuiz();
  initWelcomePage(quiz, modal, pageWrapper);
}
