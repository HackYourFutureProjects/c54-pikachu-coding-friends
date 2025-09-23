/**
 * Create the welcome screen
 * @returns {Element}
 */
export const createWelcomeElement = (quiz) => {
  const section = document.createElement('section');
  section.className = 'welcome';
  section.innerHTML = `
        <h1 class="welcome__title">${quiz.title}</h1>
        <p class="welcome__desc">${quiz.description ?? ''}</p>
        <img class="welcome__img" src="${quiz.image}" alt="${quiz.title}">
        <div class="welcome__actions">
          <button id="start-quiz" class="button button--primary">Start quiz</button>
        </div>
  `;
  return section;
};
