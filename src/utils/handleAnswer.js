/**
 * @param {number} index
 * @param {number} correctIndex

 * @param {HTMLButtonElement} button
 * @param {HTMLButtonElement} correctBtn
 * @param {Object} quiz
 *   @param {Object[]} quiz.questions
 *   @param {number} quiz.points
 *   @param {number} quiz.streak
 */

export function handleAnswer(index, correctIndex, button, correctBtn, quiz) {
  const isCorrect = index === correctIndex;

  if (isCorrect) {
    button.classList.add('success');
    quiz.points += 1;
    quiz.streak += 1;
  } else {
    button.classList.add('wrong');
    correctBtn.classList.add('success');
    quiz.streak = 0;
  }

  return isCorrect;
}
