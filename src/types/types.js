/**
 * @typedef {Object} QuizQuestion
 * @property {string} id
 * @property {string} question
 * @property {string[]} options
 * @property {number} correctIndex
 * @property {number|null} [userAnswer]
 * @property {boolean} skipped
 */

/**
 * @typedef {Object} Quiz
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {string} image
 * @property {number} currentQuestion
 * @property {number} points
 * @property {boolean} completed
 * @property {number} streak
 * @property {string} icon
 * @property {string} type
 * @property {QuizQuestion[]} questions
 */
