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
            return {
                //TODO:add q id and option selected to answers list
            }
        default:
            return state
    }
}

export default users