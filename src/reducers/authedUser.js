import { USER_LOGIN, USER_LOGOUT } from '../constants/actionTypes'

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