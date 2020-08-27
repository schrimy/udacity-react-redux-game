import { RECEIVE_USERS, ADD_USER } from '../constants/actionTypes'
import { _saveNewUser } from '../utils/_DATA'
import { showLoading, hideLoading } from 'react-redux-loading'

export const receiveUsers = (users) => ({
    type: RECEIVE_USERS,
    users
})

export const addUser = (newUser) => ({
    type: ADD_USER,
    newUser,
    userName: newUser.id
})

export const handleNewUser = (newUser) => {
    return (dispatch) => {
        dispatch(showLoading())
        return _saveNewUser(newUser)
        .then((formattedUser) => {
            dispatch(addUser(formattedUser))
            dispatch(hideLoading())
        })
    }
}