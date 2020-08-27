import { combineReducers } from 'redux'
import authedUser from './authedUser'
import questions from './questions'
import users from './users'
import { loadingBarReducer } from 'react-redux-loading'

//uses package method to combine required reducers so they can be passed into the store creator method
export default combineReducers({
    authedUser,
    questions,
    users,
    loadingBar: loadingBarReducer
})