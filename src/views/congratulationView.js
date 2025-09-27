/**
 * @param {Object} quiz
 * @param {string} quiz.id
 * @param {string} quiz.title
 * @param {number} quiz.points
 * @param {number} quiz.streak
 * @param {Object[]} quiz.questions
 * @param {string} name
 *
 * @returns {{ container: HTMLElement, button: HTMLButtonElement }}
 */

export function congratulationView(quiz, name) {
  const total = quiz.questions.length;
  const score = quiz.points;

  const container = document.createElement('div');
  container.className = 'congratulation';

  const title = document.createElement('h2');

  const button = document.createElement('button');
  button.className = 'primary';
  button.textContent = 'Start again';

  if (name === 'skipped' || !name) {
    title.textContent = `Congratulation! You get ${score}/${total} points`;
  } else {
    title.textContent = `Congratulation ${name}! You get ${score}/${total} points`;
  }

  container.appendChild(title);

  return {
    container,
    button,
  };
}
