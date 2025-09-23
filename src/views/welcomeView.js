/**
 * Create the welcome screen
 * @returns {Element}
 */
export const createWelcomeElement = (quiz) => {
  const section = document.createElement('section');
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
          <button id="start-quiz" class="button primary">Start quiz</button>
        </div>
  `;
  return section;
};
