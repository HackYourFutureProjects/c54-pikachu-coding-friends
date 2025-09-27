import { burgerMenuView } from './burgerMenuView.js';
import { categories, quizData } from '../data.js';
import { attachBurgerController } from '../controllers/attachBurgerMenuController.js';
import { setCurrentQuiz } from '../state/quizState.js';
import { initWelcomePage } from '../pages/welcomePage.js';

/**
 * @param {HTMLElement} modal
 * @param {HTMLElement} pageWrapper
 * @param {Object} options
 * @param {Function} options.onLogoClick
 * @returns {HTMLElement}
 */

export function header(modal, pageWrapper, { onLogoClick }) {
  const header = document.createElement('header');
  header.className = 'header';

  const menu = burgerMenuView(categories);

  header.innerHTML = `
               <div class="header__inner">
                   <div class="container">
                   <div class="header__wrapper">
                        <nav class="header__nav">
                              <img src="../public/images/logo.png" alt="App Logo" class="logo" />
                              <span class="title">Pikachu Quiz</span>
                        </nav>
                    </div>
                  </div>
               </div>
    `;
  header.querySelector('.header__wrapper').appendChild(menu);

  const logo = header.querySelector('.header__nav');
  if (onLogoClick) {
    logo.addEventListener('click', onLogoClick);
  }

  attachBurgerController(header, {
    onSelect: (id) => {
      setCurrentQuiz(id);
      const quiz = quizData.find((q) => q.id === id);
      initWelcomePage(quiz, modal, pageWrapper);
    },
  });

  return header;
}
