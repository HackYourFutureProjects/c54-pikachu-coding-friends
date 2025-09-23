import { ANSWERS_LIST_ID, NEXT_QUESTION_BUTTON_ID } from '../constants.js';

/**
 * Create the full question view
 * @param {Object} question
 * @param {string} question.text
 * @param {string[]} question.options
 * @param {string} [question.image]
 * @param {string} [question.alt]
 * @returns {HTMLElement}
 */
export function createQuestionView({
  index = 1,
  total = 1,
  correct = 0,
  points = 0,
  streak = 0,
  current = { text: '', options: [] },
}) {
  const root = document.createElement('section');
  root.className = 'quiz-question';

  // Score
  const score = document.createElement('div');
  score.className = 'quiz-score';
  score.innerHTML = `
    <div class="quiz-score__top" aria-label="Current quiz stats">
      <div class="quiz-score__item">
        <span class="quiz-score__value">${correct} / ${Math.max(
    0,
    index - 1
  )}</span>
        <span class="quiz-score__label">CORRECT</span>
      </div>
      <div class="quiz-score__item">
        <span class="quiz-score__value">${points}</span>
        <span class="quiz-score__label">POINTS SO FAR</span>
      </div>
      <div class="quiz-score__item">
        <span class="quiz-score__value">${streak}</span>
        <span class="quiz-score__label">STREAK</span>
      </div>
    </div>
    <div class="quiz-score__progress" role="progressbar"
         aria-valuemin="0" aria-valuemax="100"
         aria-valuenow="${percent(index - 1, total)}">
      <div class="quiz-score__bar" style="width:${percent(
        index - 1,
        total
      )}%"></div>
    </div>
  `;

  //Question block
  const block = document.createElement('div');
  block.className = 'quiz-question__block';

  const header = document.createElement('header');
  header.className = 'quiz-question__header';

  const title = document.createElement('h2');
  title.className = 'quiz-question__title';
  title.textContent = current.text || '';

  const perQuestionPoints = current?.points ?? 10;
  const pointsChip = document.createElement('span');
  pointsChip.className = 'quiz-question__points';
  pointsChip.setAttribute('aria-label', 'Points for this question');
  pointsChip.textContent = `${perQuestionPoints} POINTS`;

  header.append(title, pointsChip);
  block.appendChild(header);

  // Picture
  if (current.image) {
    const picture = document.createElement('div');
    picture.className = 'quiz-question__picture';
    const img = document.createElement('img');
    img.src = current.image;
    img.alt = current.alt ? escapeHTML(current.alt) : 'question image';
    picture.appendChild(img);
    block.appendChild(picture);
  }

  // Answers
  const list = document.createElement('ul');
  list.className = 'quiz-question__list';
  if (ANSWERS_LIST_ID) list.id = ANSWERS_LIST_ID;

  const letters = ['A', 'B', 'C', 'D'];
  (current.options || []).slice(0, 4).forEach((opt, i) => {
    const li = document.createElement('li');
    li.className = 'quiz-question__item';

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'button tertiary quiz-question__answer';
    btn.dataset.index = String(i);
    btn.setAttribute('aria-label', `Answer ${letters[i]}: ${opt}`);
    btn.innerHTML = `
      <span class="answer__key">${letters[i]}</span>
      <span class="answer__text">${escapeHTML(opt)}</span>
    `;

    btn.addEventListener('click', () => {
      root.dispatchEvent(
        new CustomEvent('answer:select', {
          bubbles: true,
          detail: { index: i },
        })
      );
    });

    li.appendChild(btn);
    list.appendChild(li);
  });
  block.appendChild(list);

  // Nav
  const nav = document.createElement('div');
  nav.className = 'quiz-question__nav';

  const skipBtn = document.createElement('button');
  skipBtn.type = 'button';
  skipBtn.className = 'button secondary';
  skipBtn.dataset.action = 'skip';
  skipBtn.setAttribute('aria-label', 'Skip question');
  skipBtn.textContent = 'Skip';

  const nextBtn = document.createElement('button');
  nextBtn.type = 'button';
  nextBtn.className = 'button primary';
  nextBtn.dataset.action = 'next';
  if (NEXT_QUESTION_BUTTON_ID) nextBtn.id = NEXT_QUESTION_BUTTON_ID;
  nextBtn.setAttribute('aria-label', 'Continue to next');
  nextBtn.textContent = 'Continue';

  nav.append(skipBtn, nextBtn);

  nav.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-action]');
    if (!btn) return;
    const action = btn.dataset.action;
    root.dispatchEvent(
      new CustomEvent(`question:${action}`, { bubbles: true })
    );
  });

  root.append(score, block, nav);
  return root;
}

export const createQuestionElement = (params) => createQuestionView(params);

// Utils
function escapeHTML(str = '') {
  return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}
function percent(done, total) {
  if (!total) return 0;
  return Math.max(0, Math.min(100, Math.round((done / total) * 100)));
}
