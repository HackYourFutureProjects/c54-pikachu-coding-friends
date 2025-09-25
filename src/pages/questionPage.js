import { createQuestionView } from '../views/questionView.js';

export const initQuestionPage = (quiz, pageWrapper) => {
  pageWrapper.innerHTML = '';
  const initQuestionPageEl = document.createElement('div');
  const { questions, currentQuestion, image, points } = quiz;

  const current = questions[currentQuestion];

  const {
    questionDiv,
    skipButton,
    nextButton,
    questionButtons,
  } = createQuestionView(current, image);

  //quiz.currentQuestion++,  initQuestionPage(quiz, pageWrapper), const correctAnswer = current.options[current.correctIndex]

  questionButtons.forEach((button) => {
    //button.classList.add('wrong')
    button.addEventListener('click', (e) => {
      nextButton.classList.toggle('hide');
    });
  });

  nextButton.addEventListener('click', () => {
    quiz.currentQuestion++;
    initQuestionPage(quiz, pageWrapper);
  });

  skipButton.addEventListener('click', () => {
    nextButton.classList.toggle('hide');
  });

  initQuestionPageEl.appendChild(questionDiv);
  pageWrapper.appendChild(initQuestionPageEl);
};
