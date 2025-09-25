import { initWelcomePage } from './pages/welcomePage.js';
import { nameModalView } from './views/modal.js';
import { header } from './views/header.js';
import { currentQuiz } from './utils/getCurrentQuiz.js';

let modal;

const loadApp = () => {
  const root = document.getElementById('user-interface');
  root.innerHTML = '';

  if (!modal) {
    modal = nameModalView();
    document.body.appendChild(modal);
  }

  const quiz = currentQuiz();

  const pageWrapper = document.createElement('div');
  pageWrapper.className = 'page-wrapper';

  const mainHeader = header(modal, pageWrapper, {
    onLogoClick: () => {
      const quiz = currentQuiz();
      initWelcomePage(quiz, modal, pageWrapper);
    },
  });

  root.appendChild(mainHeader);
  root.appendChild(pageWrapper);

  initWelcomePage(quiz, modal, pageWrapper);
};

window.addEventListener('load', loadApp);
