import { getUserName } from '../state/userState.js';
import { congratulationView } from '../views/congratulationView.js';
import { updatePage } from '../utils/updatePage.js';

export function congratulationPage(quiz, pageWrapper, modal) {
  pageWrapper.innerHTML = '';
  const congratulationPageElement = document.createElement('div');
  congratulationPageElement.className = 'congratulationPage';

  const name = getUserName();
  const { container, button } = congratulationView(quiz, name);

  button.addEventListener('click', () => {
    updatePage(modal, pageWrapper);
  });

  congratulationPageElement.appendChild(container);
  congratulationPageElement.appendChild(button);
  pageWrapper.appendChild(congratulationPageElement);
}
