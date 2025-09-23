import { BURGER_BUTTON, BURGER_MENU } from '../constants.js';

export function attachBurgerController(rootEl, { onSelect }) {
  const btn = rootEl.querySelector(`#${BURGER_BUTTON}`);
  const menu = rootEl.querySelector(`#${BURGER_MENU}`);

  function toggleMenu() {
    if (menu.classList.contains('is-open')) {
      closeMenu();
    } else {
      openMenu();
    }
  }
  function onOutsideClick(e) {
    if (menu.contains(e.target) || btn.contains(e.target)) {
      return;
    }
    closeMenu();
  }

  function openMenu() {
    menu.classList.add('is-open');
    btn.classList.add('is-active');
    document.addEventListener('click', onOutsideClick);
  }

  function closeMenu() {
    menu.classList.remove('is-open');
    btn.classList.remove('is-active');
    document.removeEventListener('click', onOutsideClick);
  }

  function onMenuClick(e) {
    if (e.target.matches('button[data-id]')) {
      const id = e.target.dataset.id;
      closeMenu();
      setTimeout(() => {
        onSelect?.(id);
      }, 150);
    }
  }

  btn.addEventListener('click', toggleMenu);
  menu.addEventListener('click', onMenuClick);
}
