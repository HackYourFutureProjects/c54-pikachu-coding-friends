export function setCurrentQuiz(id) {
  localStorage.setItem('current-quiz', id);
}

export function getCurrentQuiz() {
  const saved = localStorage.getItem('current-quiz');
  return saved ? saved : null;
}
