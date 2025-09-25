export function questionHeaderView(points, streak) {
    const questionHeaderDiv = document.createElement('div');
    questionHeaderDiv.className = 'question-header';

    questionHeaderDiv.innerHTML = `
        <div class="question-header__item">Points: ${points}</div>
        <div class="question-header__item timer"></div>
        <div class="question-header__item">Streak: ${streak}</div>
    `
    return questionHeaderDiv;
}