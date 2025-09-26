import { timerView } from './timerView.js';
import { timerController } from '../controllers/timerController.js';

export function questionHeaderView(points, streak, { onTimeout }) {
  const questionHeaderDiv = document.createElement('div');
  questionHeaderDiv.className = 'question-header';

  questionHeaderDiv.innerHTML = `
        <div class="question-header__item">Points: ${points}</div>
        <div class="timer"></div>
        <div class="question-header__item">Streak: ${streak}</div>
    `;

  const timerContainer = questionHeaderDiv.querySelector('.timer');
  const { timerDiv, circle, text, circumference } = timerView();

  timerController({
    duration: 30,
    circumference,
    circle,
    text,
    onTimeout,
  });

  timerContainer.appendChild(timerDiv);
  return questionHeaderDiv;
}
