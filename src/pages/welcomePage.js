import { initQuestionPage } from './questionPage.js';
import { getUserName, setUserName } from '../state/userState.js';
import { createWelcomeElement } from '../views/welcomeView.js';
import { attachNameModalController } from '../controllers/attachNameModalController.js';
import { header } from '../views/header.js';

export const initWelcomePage = (quiz, modal) => {
  const root = document.getElementById('user-interface');
  root.innerHTML = '';

  const mainHeader = header(modal);

  root.appendChild(mainHeader);

  const page = createWelcomeElement(quiz);
  root.appendChild(page);

  const startBtn = page.querySelector('#start-quiz');

  startBtn.addEventListener('click', () => {
    initQuestionPage(quiz);
  });

  const existingName = getUserName();
  attachNameModalController(modal, {
    open: !existingName,
    onSave: (name) => setUserName(name),
    onSkip: () => setUserName('skipped'),
  });
};
