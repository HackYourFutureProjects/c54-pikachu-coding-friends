import { timerView } from './timerView.js';
import { timerController } from '../controllers/timerController.js';

export function questionHeaderView(points, streak, { onTimeout }) {
  const questionHeaderElement = document.createElement('div');
  questionHeaderElement.className = 'question-header';

  questionHeaderElement.innerHTML = `
        <div class="question-header__item">Points: ${points}</div>
        <div class="timer"></div>
        <div class="question-header__item">Streak: ${streak}</div>
    `;

  const timerContainer = questionHeaderElement.querySelector('.timer');
  const { timerDiv, circle, text, circumference } = timerView();

  const { stop } = timerController({
    duration: 30,
    circumference,
    circle,
    text,
    onTimeout,
  });

  timerContainer.appendChild(timerDiv);
  return { questionHeaderElement, stop };
}
