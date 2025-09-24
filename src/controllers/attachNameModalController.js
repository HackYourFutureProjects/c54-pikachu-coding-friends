import {
  MODAL_CLOSE_ID,
  MODAL_INPUT_ID,
  MODAL_SAVE_NAME,
} from '../constants.js';

export function attachNameModalController(
  modalEl,
  { onSave, onSkip, open = false } = {}
) {
  const input = modalEl.querySelector(`#${MODAL_INPUT_ID}`);
  const btnClose = modalEl.querySelector(`#${MODAL_CLOSE_ID}`);
  const btnSave = modalEl.querySelector(`#${MODAL_SAVE_NAME}`);
  const modalBox = modalEl.querySelector('.modal');
  const documentElement = document.documentElement;

  function openModal() {
    requestAnimationFrame(() => {
      modalEl.classList.add('is-open');
      documentElement.classList.add('is-lock');
    });

    if (input) {
      input.focus();
    }
  }

  function closeModal() {
    modalEl.classList.remove('is-open');
    documentElement.classList.remove('is-lock');
  }

  function onOverlayClick() {
    closeModal();
    onSkip?.();
  }

  function stop(e) {
    e.stopPropagation();
  }

  function onSaveClick() {
    const value = input?.value.trim();
    if (value) {
      onSave?.(value);
      closeModal();
    }
  }

  modalEl.addEventListener('click', onOverlayClick);
  modalBox.addEventListener('click', stop);
  btnClose.addEventListener('click', closeModal);
  btnSave.addEventListener('click', onSaveClick);

  if (open) {
    openModal();
  }
}
