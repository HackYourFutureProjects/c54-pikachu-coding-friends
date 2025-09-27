/**
 * @param {HTMLButtonElement[]|NodeListOf<HTMLButtonElement>} buttons
 */

export function disableButtons(buttons) {
  buttons.forEach((b) => (b.disabled = true));
}
