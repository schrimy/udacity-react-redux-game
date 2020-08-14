import { RECEIVE_QUESTIONS, SAVE_ANSWER, ADD_QUESTION } from '../constants/actionTypes'

const questions = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_QUESTIONS:
            return {
                ...state,
                ...action.questions
            }
        case ADD_QUESTION:
            return {
                //TODO:add question onto q list
            }
        case SAVE_ANSWER:
            return {
                //TODO:save userId on to question option that was selected
            }
        default:
            return state
    }
}

export default questions