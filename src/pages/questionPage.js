import { createQuestionView } from '../views/questionView.js';
import { questionHeaderView } from '../views/questionHeaderView.js';
import { congratulationPage } from './congratulationPage.js';
import { animatePageTransition } from '../controllers/animationPageTransition.js';
import { disableButtons } from '../utils/disableButtons.js';
import { handleAnswer } from '../utils/handleAnswer.js';
import { skipQuestion } from '../utils/skipQuestion.js';
import { saveProgress, loadProgress } from '../utils/quizStorageProgress.js';

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
          stop
        );
        saveProgress(quiz);
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

  if (current.skipped) {
    skipQuestion(
      current,
      correctBtn,
      questionButtons,
      nextButton,
      skipButton,
      stop
    );
    answered = true;
  } else if (current.userAnswer !== null && current.userAnswer !== undefined) {
    questionButtons.forEach((b) => (b.disabled = true));
    skipButton.classList.add('hide');

    const chosen = questionButtons[current.userAnswer];
    chosen.classList.add(
      current.userAnswer === current.correctIndex ? 'success' : 'wrong'
    );
    if (current.userAnswer !== current.correctIndex) {
      correctBtn.classList.add('success');
    }

    nextButton.classList.remove('hide');
    stop();
    answered = true;
  }

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
      saveProgress(quiz);
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
  saveProgress(quiz);

  pageWrapper.appendChild(questionHeaderElement);
  initQuestionPageEl.appendChild(questionDiv);
  pageWrapper.appendChild(initQuestionPageEl);
};
