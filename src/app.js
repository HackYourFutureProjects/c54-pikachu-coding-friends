import { initWelcomePage } from './pages/welcomePage.js';
import { getCurrentQuiz } from './state/quizState.js';
import { quizData } from './data.js';
import { nameModalView } from './views/modal.js';

let modal;

const loadApp = () => {
  if (!modal) {
    modal = nameModalView();
    document.body.appendChild(modal);
  }

  let quizId = getCurrentQuiz() || quizData[0].id;
  const quiz = quizData.find((q) => q.id === quizId);
  initWelcomePage(quiz, modal);
};

window.addEventListener('load', loadApp);
