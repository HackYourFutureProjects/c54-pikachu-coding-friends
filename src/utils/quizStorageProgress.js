const K = (id) => `quiz-progress:${id}`;

export function saveProgress(quiz) {
  const data = {
    currentQuestion: quiz.currentQuestion || 0,
    points: quiz.points || 0,
    streak: quiz.streak || 0,
    answers: quiz.questions.map((q) => ({
      id: q.id,
      userAnswer: q.userAnswer ?? null,
      skipped: !!q.skipped,
    })),
  };
  localStorage.setItem(K(quiz.id), JSON.stringify(data));
}

export function loadProgress(quiz) {
  const raw = localStorage.getItem(K(quiz.id));
  if (!raw) return quiz;
  const d = JSON.parse(raw);

  if (d.currentQuestion != null) quiz.currentQuestion = d.currentQuestion;
  if (d.points != null) quiz.points = d.points;
  if (d.streak != null) quiz.streak = d.streak;

  (d.answers || []).forEach((a) => {
    const q = quiz.questions.find((x) => x.id === a.id);
    if (q) {
      q.userAnswer = a.userAnswer ?? null;
      q.skipped = !!a.skipped;
    }
  });

  return quiz;
}

export function resetCardProgress(quizId) {
  localStorage.removeItem(K(quizId));
}
