import { createQuestionView } from '../views/questionView.js';
import { questionHeaderView } from '../views/questionHeaderView.js';
import { congratulationPage } from './congratulationPage.js';
import { animatePageTransition } from '../controllers/animationPageTransition.js';
import { disableButtons } from '../utils/disableButtons.js';
import { handleAnswer } from '../utils/handleAnswer.js';
import { skipQuestion } from '../utils/skipQuestion.js';
import { saveProgress, loadProgress } from '../utils/quizStorageProgress.js';
import { restoreQuestionState } from '../utils/restoreQuestionState.js';
/**
 * @param {Quiz} quiz
 * @param {HTMLElement} pageWrapper
 * @param {HTMLElement} modal
 */

export const initQuestionPage = (quiz, pageWrapper, modal) => {
  if (typeof quiz.points !== 'number') {
    quiz.points = 0;
  }
  loadProgress(quiz);

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
          stop,
          quiz
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

  let { answered } = restoreQuestionState({
    current,
    correctBtn,
    questionButtons,
    nextButton,
    skipButton,
    stop,
    quiz,
  });

  questionButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      if (answered) {
        return;
      }
      answered = true;
      current.userAnswer = index;

      disableButtons(questionButtons);
      skipButton.classList.add('hide');

      handleAnswer(index, current.correctIndex, button, correctBtn, quiz);

      nextButton.classList.remove('hide');
      stop();
      saveProgress(quiz);
    });
  });

  nextButton.addEventListener('click', () => {
    quiz.currentQuestion++;
    saveProgress(quiz);
    animatePageTransition(pageWrapper, () => {
      if (quiz.currentQuestion < quiz.questions.length) {
        initQuestionPage(quiz, pageWrapper, modal);
      } else {
        congratulationPage(quiz, pageWrapper, modal);
      }
    });
  });

  skipButton.addEventListener('click', () => {
    skipQuestion(
      current,
      correctBtn,
      questionButtons,
      nextButton,
      skipButton,
      stop,
      quiz
    );
  });

  pageWrapper.appendChild(questionHeaderElement);
  initQuestionPageEl.appendChild(questionDiv);
  pageWrapper.appendChild(initQuestionPageEl);
};
