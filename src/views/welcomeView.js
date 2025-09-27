import { getProgress } from '../utils/quizStorageProgress.js';
/**
 * Create the welcome screen
 * @param {Quiz} quiz
 * @returns {Element}
 */

export const createWelcomeElement = (quiz) => {
  const section = document.createElement('section');

  const hasProgress = getProgress(quiz.id);

  const label = hasProgress ? 'Continue' : 'Start';

  section.className = 'welcome';
  section.innerHTML = `
        <div class="welcome__header">
            <h1 class="welcome__title">${quiz.title}</h1>
            <p class="welcome__desc">${quiz.description ?? ''}</p>
        </div>
        <div class="welcome__img-wrapper">
           <img class="welcome__img" src="${quiz.image}" alt="${quiz.title}">
        </div>
        <div class="welcome__actions">
          <button id="start-quiz" class="button primary" data-state="${
            hasProgress ? 'continue' : 'start'
          }">${label}</button>
        </div>
  `;
  return section;
};
