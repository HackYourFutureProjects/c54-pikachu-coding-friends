import { BURGER_BUTTON, BURGER_MENU } from '../constants.js';

export function burgerMenuView(categories) {
  const burgerMenu = document.createElement('div');
  burgerMenu.className = 'burger-wrapper';

  burgerMenu.innerHTML = `
    <button 
           class="burger-button" 
           type="button" 
           aria-label="Open menu" 
           id="${BURGER_BUTTON}"
        >
          <span class="burger-button__line"></span>
          <span class="burger-button__line"></span>
          <span class="burger-button__line"></span>
    </button>
    <nav class="menu" id="${BURGER_MENU}">
      <ul class="menu__list">
        ${categories
          .map(
            (cat) => `
          <li class="menu__list-item">
              <div class="icon ${cat.type}">
                  <img src="../public/images/${cat.icon}" alt="${cat.icon}">
              </div>
         
<!--            <svg width="32" height="32" class="${cat.icon}"><use href="../public/images/sprite.svg#${cat.icon}"></use></svg>-->
            <button class="menu__button transparent" data-id="${cat.id}">${cat.title}</button>
          </li>
        `
          )
          .join('')}
      </ul>
    </nav>
  `;

  return burgerMenu;
}
