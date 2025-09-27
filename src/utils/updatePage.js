import { currentQuiz } from './getCurrentQuiz.js';
import { initWelcomePage } from '../pages/welcomePage.js';
/**
 * @param {HTMLElement} pageWrapper
 * @param {HTMLElement} modal
 */

export function updatePage(modal, pageWrapper) {
  const quiz = currentQuiz();
  initWelcomePage(quiz, modal, pageWrapper);
}
