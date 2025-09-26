import { initQuestionPage } from './questionPage.js';
import { getUserName, setUserName } from '../state/userState.js';
import { createWelcomeElement } from '../views/welcomeView.js';
import { attachNameModalController } from '../controllers/attachNameModalController.js';
import { header } from '../views/header.js';
import { questionHeaderView } from '../views/questionHeaderView.js';

export const initWelcomePage = (quiz, modal, pageWrapper) => {
  pageWrapper.innerHTML = '';

  const page = createWelcomeElement(quiz);
  const headerP = questionHeaderView(2, 3, {
    onTimeout: () => {
      console.log('⏰skip!');
    },
  });
  pageWrapper.appendChild(headerP);
  pageWrapper.appendChild(page);

  const startBtn = page.querySelector('#start-quiz');

  startBtn.addEventListener('click', () => {
    initQuestionPage(quiz, pageWrapper);
  });

  const existingName = getUserName();
  attachNameModalController(modal, {
    open: !existingName,
    onSave: (name) => setUserName(name),
    onSkip: () => setUserName('skipped'),
  });
};
