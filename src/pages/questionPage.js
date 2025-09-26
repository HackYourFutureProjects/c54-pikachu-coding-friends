import { createQuestionView } from '../views/questionView.js';

export const initQuestionPage = (quiz, pageWrapper) => {
  if (typeof quiz.points !== 'number') quiz.points = 0;

  pageWrapper.innerHTML = '';
  const initQuestionPageEl = document.createElement('div');

  const { questions, currentQuestion, image } = quiz;
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

  let answered = false;

  questionButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      if (answered) return;
      answered = true;

      questionButtons.forEach((b) => (b.disabled = true));

      const isCorrect = index === current.correctIndex;

      if (isCorrect) {
        button.classList.add('success');
        quiz.points += 1;
      } else {
        button.classList.add('wrong');
        const correctBtn = questionButtons[current.correctIndex];
        if (correctBtn) correctBtn.classList.add('success');
      }

      nextButton.classList.remove('hide');
      nextButton.disabled = false;

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
    quiz.currentQuestion++;
    initQuestionPage(quiz, pageWrapper);
    nextButton.classList.toggle('hide');
  });

  initQuestionPageEl.appendChild(questionDiv);
  pageWrapper.appendChild(initQuestionPageEl);
};

