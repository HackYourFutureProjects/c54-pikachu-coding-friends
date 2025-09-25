/**
 * @typedef {Object} category
 * @property {string} [question]
 * @property {string[]} [options]
 * @property {string} [image]
 * @property {string} [alt]
 */
import {NEXT_BUTTON_ID, SKIP_BUTTON_ID} from "../constants.js";

export function createQuestionView(currentQuestion, image) {
    const {options, question } = currentQuestion

    const questionDiv = document.createElement("div");
    questionDiv.className = "quiz-question";

    questionDiv.innerHTML = `
      <div class="quiz-question__header">
        <h3 class="quiz-question__title">${question}</h3>
        <img class="quiz-question__image" src="${image}" alt="${question}">
      </div>
      <ul class="quiz-question__list">
        ${options.map((opt, i) => `
            <button class="button tertiary quiz-question__list-button data-index="${i}"">${opt}</button>
        `).join("")}
      </ul>
      <button id="${NEXT_BUTTON_ID}" class="button primary hide">Next</button>
      <button id="${SKIP_BUTTON_ID}" class="button primary">Skip</button>
  `
    const nextButton = questionDiv.querySelector(`#${NEXT_BUTTON_ID}`)
    const skipButton = questionDiv.querySelector(`#${SKIP_BUTTON_ID}`)

    const questionButtons = questionDiv.querySelectorAll(".quiz-question__list-button");

    return {
        questionDiv,
        skipButton,
        nextButton,
        questionButtons
    }
}