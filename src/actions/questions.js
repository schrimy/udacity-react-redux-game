import { ADD_QUESTION, RECEIVE_QUESTIONS } from '../constants/actionTypes'

export const receiveQuestions = (questions) => ({
    type: RECEIVE_QUESTIONS,
    questions
})