import { createQuestionView } from '../views/questionView.js';
import { questionHeaderView } from '../views/questionHeaderView.js';
import { congratulationPage } from './congratulationPage.js';
import { animatePageTransition } from '../controllers/animationPageTransition.js';
import { disableButtons } from '../utils/disableButtons.js';
import { handleAnswer } from '../utils/handleAnswer.js';
import { skipQuestion } from '../utils/skipQuestion.js';

export const initQuestionPage = (quiz, pageWrapper, modal) => {
  if (typeof quiz.points !== 'number') {
    quiz.points = 0;
  }

  pageWrapper.innerHTML = '';
  const initQuestionPageEl = document.createElement('div');

  const { questionHeaderElement, stop } = questionHeaderView(
    quiz.points,
    quiz.streak,
    {
      onTimeout: () => {
        skipQuestion(
          current,
          correctBtn,
          questionButtons,
          nextButton,
          skipButton,
          stop
        );
      },
    }
  );

  const { questions, currentQuestion, image } = quiz;
  const current = questions[currentQuestion];

  const {
    questionDiv,
    skipButton,
    nextButton,
    questionButtons,
  } = createQuestionView(current, image);

  const correctBtn = questionButtons[current.correctIndex];
  let answered = false;

  questionButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      if (answered) {
        return;
      }
      answered = true;

      disableButtons(questionButtons);
      skipButton.classList.add('hide');

      handleAnswer(index, current.correctIndex, button, correctBtn, quiz);

      nextButton.classList.remove('hide');
      stop();
    });
  });

  nextButton.addEventListener('click', () => {
    quiz.currentQuestion++;

    animatePageTransition(pageWrapper, () => {
      if (quiz.currentQuestion < quiz.questions.length) {
        initQuestionPage(quiz, pageWrapper, modal);
      } else {
        congratulationPage(quiz, pageWrapper, modal);
      }
    });
  });

  skipButton.addEventListener('click', () =>
    skipQuestion(
      current,
      correctBtn,
      questionButtons,
      nextButton,
      skipButton,
      stop
    )
  );

  pageWrapper.appendChild(questionHeaderElement);
  initQuestionPageEl.appendChild(questionDiv);
  pageWrapper.appendChild(initQuestionPageEl);
};
