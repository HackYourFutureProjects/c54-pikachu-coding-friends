import { getUserName } from '../state/userState.js';
import { congratulationView } from '../views/congratulationView.js';
import { updatePage } from '../utils/updatePage.js';
import { resetCardProgress } from '../utils/quizStorageProgress.js';

export function congratulationPage(quiz, pageWrapper, modal) {
  pageWrapper.innerHTML = '';
  const congratulationPageElement = document.createElement('div');
  congratulationPageElement.className = 'congratulationPage';

  const name = getUserName();
  const { container, button } = congratulationView(quiz, name);

  button.addEventListener('click', () => {
    quiz.currentQuestion = 0;
    quiz.points = 0;
    quiz.question.forEach((q) => {
      q.userAnswer = null;
      q.skipped = false;
    });
    resetCardProgress(quiz.id);

    updatePage(modal, pageWrapper);
  });

  congratulationPageElement.appendChild(container);
  congratulationPageElement.appendChild(button);
  pageWrapper.appendChild(congratulationPageElement);
}
