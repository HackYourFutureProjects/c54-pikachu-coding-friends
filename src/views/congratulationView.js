export function congratulationView(quiz) {
  const userName = localStorage.getItem('userName');
  const total = quiz.questions.length;
  const score = quiz.points;

  const container = document.createElement('div');
  container.className = 'congratulation';

  const title = document.createElement('h2');

  if (userName === 'skipped' || !userName) {
    title.textContent = 'Congratulation!';
  } else {
    title.textContent = `Congratulation ${userName}! You get ${score}/${total} points`;
  }

  container.appendChild(title);

  return container;
}
