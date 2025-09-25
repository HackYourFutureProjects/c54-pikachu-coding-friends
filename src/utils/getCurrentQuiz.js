import { quizData } from '../data.js';
import { getCurrentQuiz } from '../state/quizState.js';

export function currentQuiz() {
  const currentQuizId = getCurrentQuiz() || quizData[0].id;
  return quizData.find((q) => q.id === currentQuizId);
}
