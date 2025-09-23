import { initQuestionPage } from './questionPage.js';
import { NameModalView } from '../views/modal.js';
import { getUserName, setUserName } from '../state/userState.js';
import { createWelcomeElement } from '../views/welcomeView.js';
import { attachNameModalController } from '../controllers/attachNameModalController.js';
import { header } from '../views/header.js';

export const initWelcomePage = (quiz) => {
  const root = document.getElementById('user-interface');
  root.innerHTML = '';

  const mainHeader = header();

  root.appendChild(mainHeader);

  const page = createWelcomeElement(quiz);
  root.appendChild(page);

  const startBtn = page.querySelector('#start-quiz');

  startBtn.addEventListener('click', () => {
    initQuestionPage(quiz);
  });

  const modal = NameModalView();
  document.body.appendChild(modal);

  const existingName = getUserName();
  attachNameModalController(modal, {
    open: !existingName,
    onSave: (name) => setUserName(name),
    onSkip: () => setUserName('skipped'),
  });
};
