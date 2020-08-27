import { RECEIVE_QUESTIONS, SAVE_ANSWER, ADD_QUESTION } from '../constants/actionTypes'

/**
 * reducer that organises data for questions slice of store state
 * receieves and inputs intital data from backend, adds in new question to list
 * saves user id to relevant question's votes array. Default value of empty obj.
 */

//state here = quesions slice
const questions = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_QUESTIONS:
            return {
                ...state,
                ...action.questions
            }
        case ADD_QUESTION:
            //concat new q onto existing state (questions)
            return {
                ...state,
                [action.newQ.id]: {
                    ...action.newQ
                }
            }
        case SAVE_ANSWER:
            const { qid, answer, authedUser } = action.answerInfo

            return {
                //save userId on to question, via qid, option, via option answer, that was selected
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