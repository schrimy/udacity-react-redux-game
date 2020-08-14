import { RECEIVE_USERS, ADD_USER } from '../constants/actionTypes'

export const receiveUsers = (users) => ({
    type: RECEIVE_USERS,
    users
})