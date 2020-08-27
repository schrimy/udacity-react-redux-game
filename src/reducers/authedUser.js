import { USER_LOGIN, USER_LOGOUT } from '../constants/actionTypes'

//sets the store authedUser state if logged in or to null if logging out
//with an intital value of null
const authedUser = (state = null, action) => {
    switch (action.type) {
        case USER_LOGIN:
            return action.id
        case USER_LOGOUT:
            return null
        default:
            return state
    }
}

export default authedUser