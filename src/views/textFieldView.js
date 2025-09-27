/**
 * @param {string} [placeholder='Enter your name...']
 * @returns {HTMLInputElement}

 */

export function TextFieldView(placeholder = 'Enter your name...') {
  const inputContainer = document.createElement('div');
  inputContainer.className = 'input-container';

  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = placeholder;
  input.className = 'input';

  inputContainer.appendChild(input);
  return inputContainer;
}
