import { disableButtons } from './disableButtons.js';
import { saveProgress } from './quizStorageProgress.js';

/**
 * @param {Object} current
 *   @param {string} current.id
 *   @param {string} current.question
 *   @param {string[]} current.options
 *   @param {number} current.correctIndex
 *   @param {number|null} [current.userAnswer]
 *   @param {boolean} [current.skipped]
 * @param {HTMLButtonElement} correctBtn
 * @param {NodeListOf<HTMLButtonElement>} questionButtons
 * @param {HTMLButtonElement} nextButton
 * @param {HTMLButtonElement} skipButton
 * @param {Function} stop
 * @param {Object} quiz
 * @returns {void}
 */

export function skipQuestion(
  current,
  correctBtn,
  questionButtons,
  nextButton,
  skipButton,
  stop,
  quiz
) {
  current.skipped = true;
  correctBtn.classList.add('success');
  disableButtons(questionButtons);
  nextButton.classList.remove('hide');
  skipButton.classList.add('hide');
  document.body.classList.remove('screen-pulse');
  stop();
  saveProgress(quiz);
}
