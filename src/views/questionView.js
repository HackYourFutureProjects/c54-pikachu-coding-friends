/**
 * @typedef {Object} QuestionCurrent
 * @property {string} [text]
 * @property {string[]} [options]
 * @property {string} [image]
 * @property {string} [alt]
 * @property {number} [points]
 */

/**
 * @typedef {Object} QuestionViewParams
 * @property {number} [index]
 * @property {number} [total]
 * @property {number} [correct]
 * @property {number} [points]
 * @property {number} [streak]
 * @property {QuestionCurrent} [current]
 */

import { ANSWERS_LIST_ID, NEXT_QUESTION_BUTTON_ID } from '../constants.js';

/**
 * Quiz state and question parameters.
 *
 * @param {Object} params
 * @param {number} [params.index=1]
 * @param {number} [params.total=1]
 * @param {number} [params.correct=0]
 * @param {number} [params.points=0]
 * @param {number} [params.streak=0]
 *
 * @param {Object} [params.current]
 * @param {string} [params.current.text='']
 * @param {string[]} [params.current.options=[]]
 * @param {string} [params.current.image]
 * @param {string} [params.current.alt]
 * @param {number} [params.current.points=10]
 *
 * @returns {HTMLElement}
 */
export function createQuestionView({
  index = 1,
  total = 1,
  correct = 0,
  points = 0,
  streak = 0,
  current = { text: '', options: [] },
} = {}) {
  const safeCurrent = {
    text: '',
    options: [],
    points: 10,
    ...current,
  };

  const safeOptions = Array.isArray(safeCurrent.options)
    ? safeCurrent.options.filter(Boolean).map(String).slice(0, 4)
    : [];
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
  title.textContent = safeCurrent.text || '—';

  const perQuestionPoints = Number.isFinite(safeCurrent.points)
    ? safeCurrent.points
    : 10;
  const pointsChip = document.createElement('span');
  pointsChip.className = 'quiz-question__points';
  pointsChip.setAttribute('aria-label', 'Points for this question');
  pointsChip.textContent = `${perQuestionPoints} POINTS`;

  header.append(title, pointsChip);
  block.appendChild(header);

  // Picture
  const picture = document.createElement('div');
  picture.className = 'quiz-question__picture';

  if (safeCurrent.image) {
    const img = document.createElement('img');
    img.src = safeCurrent.image;
    img.alt = safeCurrent.alt ? String(safeCurrent.alt) : 'Question image';
    picture.appendChild(img);
  } else {
    const ph = document.createElement('div');
    ph.className = 'quiz-question__picture--placeholder';
    ph.setAttribute('aria-hidden', 'true');
    picture.appendChild(ph);
  }
  block.appendChild(picture);

  // Answers
  const list = document.createElement('ul');
  list.className = 'quiz-question__list';
  if (ANSWERS_LIST_ID) list.id = ANSWERS_LIST_ID;

  const letters = ['A', 'B', 'C', 'D'];

  if (safeOptions.length) {
    safeOptions.forEach((opt, i) => {
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

      li.appendChild(btn);
      list.appendChild(li);
    });
  } else {
    const li = document.createElement('li');
    li.className = 'quiz-question__item';

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'button tertiary quiz-question__answer';
    btn.disabled = true;
    btn.innerHTML = `
    <span class="answer__key">—</span>
    <span class="answer__text">No answers available</span>
  `;

    li.appendChild(btn);
    list.appendChild(li);
  }

  block.appendChild(list);

  list.addEventListener('click', (e) => {
    const btn = e.target.closest('button.quiz-question__answer');
    if (!btn) return;

    const i = Number(btn.dataset.index);
    if (!Number.isFinite(i)) return;

    root.dispatchEvent(
      new CustomEvent('answer:select', { bubbles: true, detail: { index: i } })
    );
  });

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
