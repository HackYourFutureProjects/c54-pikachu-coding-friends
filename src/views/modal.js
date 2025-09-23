import { TextFieldView } from './textFieldView.js';
import { MODAL_ID, MODAL_INPUT_ID, MODAL_SAVE_NAME } from '../constants.js';

export function NameModalView() {
  const modalOverlay = document.createElement('div');
  modalOverlay.className = 'overlay';

  modalOverlay.innerHTML = `
        <div class="modal" id=${MODAL_ID}>
          <div class="modal__content">
             <button class="modal__close button button--transparent" id="close-modal">X</button>
             <h2 class="modal__title">Enter your name</h2>
          </div>
        </div>  
    `;
  const modalContent = modalOverlay.querySelector('.modal__content');

  const input = TextFieldView();
  input.querySelector('input').id = MODAL_INPUT_ID;

  const btn = document.createElement('button');
  btn.textContent = 'Save';
  btn.id = MODAL_SAVE_NAME;

  modalContent.append(input, btn);
  return modalOverlay;
}
