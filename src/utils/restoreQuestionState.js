import { skipQuestion } from './skipQuestion.js';
import { disableButtons } from './disableButtons.js';

/**
 * @param {Object} params
 * @param {Object} params.current
 *   @param {string} params.current.id
 *   @param {string} params.current.question
 *   @param {string[]} params.current.options
 *   @param {number} params.current.correctIndex
 *   @param {number|null} [params.current.userAnswer]
 *   @param {boolean} [params.current.skipped]
 * @param {HTMLButtonElement} params.correctBtn
 * @param {NodeListOf<HTMLButtonElement>} params.questionButtons
 * @param {HTMLButtonElement} params.nextButton
 * @param {HTMLButtonElement} params.skipButton
 * @param {Function} params.stop
 * @param {Object} params.quiz
 * @returns {{ answered: boolean }}
 */

export function restoreQuestionState({
  current,
  correctBtn,
  questionButtons,
  nextButton,
  skipButton,
  stop,
  quiz,
}) {
  if (current.skipped) {
    skipQuestion(
      current,
      correctBtn,
      questionButtons,
      nextButton,
      skipButton,
      stop,
      quiz
    );
    return { answered: true };
  }

  if (current.userAnswer !== null && current.userAnswer !== undefined) {
    disableButtons(questionButtons);
    skipButton.classList.add('hide');

    const chosen = questionButtons[current.userAnswer];
    chosen.classList.add(
      current.userAnswer === current.correctIndex ? 'success' : 'wrong'
    );
    if (current.userAnswer !== current.correctIndex) {
      correctBtn.classList.add('success');
    }

    nextButton.classList.remove('hide');
    stop();
    return { answered: true };
  }

  return { answered: false };
}
