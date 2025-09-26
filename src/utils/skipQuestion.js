import { disableButtons } from './disableButtons.js';

export function skipQuestion(
  current,
  correctBtn,
  questionButtons,
  nextButton,
  skipButton,
  stop
) {
  current.skipped = true;
  correctBtn.classList.add('success');
  disableButtons(questionButtons);
  nextButton.classList.remove('hide');
  skipButton.classList.add('hide');
  document.body.classList.remove('screen-pulse');
  stop();
}
