import { RECEIVE_USERS, ADD_USER } from '../constants/actionTypes'

export const receiveUsers = (users) => ({
    type: RECEIVE_USERS,
    users
})

export const adddUser = (newUser) => {
    return {
        type: ADD_USER,
        newUser
    }
}