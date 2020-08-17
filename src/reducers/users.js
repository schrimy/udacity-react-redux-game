import { RECEIVE_USERS, SAVE_ANSWER, ADD_QUESTION } from '../constants/actionTypes'

const users = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_USERS:
            return {
                ...state,
                ...action.users
            }
        case ADD_QUESTION:
            return {
               //TODO:add q id to users questions array
            }
        case SAVE_ANSWER:
            const { authedUser, qid, answer } = action.answerInfo

            return {
                //TODO:add qid and option answer selected to userId answers list
                ...state,
                [authedUser]: {
                    ...state[authedUser],
                    answers: {
                        ...state[authedUser].answers,
                        [qid]: answer
                    }
                }
            }
        default:
            return state
    }
}

export default users