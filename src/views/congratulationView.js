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
