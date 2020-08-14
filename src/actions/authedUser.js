import { USER_LOGIN, USER_LOGOUT } from '../constants/actionTypes'

export const loginUser = (id) => ({
        type: USER_LOGIN,
        id
})

export const logoutUser = () => ({ type: USER_LOGOUT })