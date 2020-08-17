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
            const { qid, answer, authedUser } = action.answerInfo

            return {
                //TODO:save userId on to question, via qid, option, via option answer, that was selected
                ...state,
                [qid]: {
                    ...state[qid],
                    [answer]: {
                        ...state[qid][answer],
                        votes: state[qid][answer].votes.concat([authedUser])
                    }
                }
            }
        default:
            return state
    }
}

export default questions