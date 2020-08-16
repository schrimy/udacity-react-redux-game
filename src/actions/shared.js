import { _getUsers, _getQuestions } from '../utils/_DATA'
import { receiveUsers } from './users'
import { receiveQuestions } from './questions'
import { loginUser } from './authedUser'
//shared event action for when a new q is created so add to questions list and add to user array of questions made
//also, when a q is answered save user id to option of the question and question answered with option selected to users
//TODO: set up thunk action creator to dispatch info of save answer and new q to users and questions

//mock up an authorised user
const AUTHED_ID = 'tylermcginnis'

export const handleInitialData = () => {
    return (dispatch) => {
        Promise.all([_getUsers(), _getQuestions()])
        .then(([users, questions]) => {
            dispatch(receiveUsers(users))
            dispatch(receiveQuestions(questions))
            dispatch(loginUser(AUTHED_ID))
        })
        .catch(err => {
            console.log('Error retrieving data:', err)
        })
    }
}