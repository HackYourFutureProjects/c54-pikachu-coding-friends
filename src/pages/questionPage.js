
import {createQuestionView} from "../views/questionView.js";

export const initQuestionPage = (quiz, pageWrapper) => {
    pageWrapper.innerHTML = '';
    const initQuestionPage = document.createElement('div');
    const {questions, currentQuestion, image} = quiz

    const current = questions[currentQuestion]

    const {
        questionDiv,
        skipButton,
        nextButton,
        questionButtons
    } = createQuestionView(current, image)


    initQuestionPage.appendChild(questionDiv)


    pageWrapper.appendChild(initQuestionPage)

};
