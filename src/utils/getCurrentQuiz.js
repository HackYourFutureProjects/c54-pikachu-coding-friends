import { quizData } from '../data.js';
import { getCurrentQuiz } from '../state/quizState.js';
import { loadProgress } from './quizStorageProgress.js';

export function currentQuiz() {
  const currentQuizId = getCurrentQuiz() || quizData[0].id;
  return quizData.find((q) => q.id === currentQuizId);
}

export function findCurrentQuiz(id) {
  return quizData.find((q) => q.id === id);
}

export function getCurrentQuizId() {
  return getCurrentQuiz() || quizData[0].id;
}

export function getQuiz() {
  const currentQuizId = getCurrentQuizId();
  const baseQuiz = findCurrentQuiz(currentQuizId);

  const quizCopy = JSON.parse(JSON.stringify(baseQuiz));

  return loadProgress(quizCopy);
}
