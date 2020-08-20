import { _getUsers, _getQuestions, _saveQuestionAnswer, _saveQuestion } from '../utils/_DATA'
import { receiveUsers,  } from './users'
import { receiveQuestions } from './questions'
//import { loginUser } from './authedUser'
import { SAVE_ANSWER, ADD_QUESTION } from '../constants/actionTypes'
import { showLoading, hideLoading } from 'react-redux-loading'
//shared event action for when a new q is created so add to questions list and add to user array of questions made
//also, when a q is answered save user id to option of the question and question answered with option selected to users

//mock up an authorised user
//const AUTHED_ID = 'johndoe'

/**
 * async / thunk action creators
 */
export const handleInitialData = () => {
    return (dispatch) => {
        dispatch(showLoading())
        return Promise.all([_getUsers(), _getQuestions()])
        .then(([users, questions]) => {
            dispatch(receiveUsers(users))
            dispatch(receiveQuestions(questions))
            //dispatch(loginUser(AUTHED_ID))
            dispatch(hideLoading())
        })
        .catch(err => {
            console.log('Error retrieving data:', err)
        })
    }
}

export const handleOptionSelected = (selection) => {
    return (dispatch) => {
        _saveQuestionAnswer({
            authedUser: selection.authedUser,
            qid: selection.qId,
            answer: selection.answer
        })
        .then(
            dispatch(saveAnswer({
                authedUser: selection.authedUser,
                qid: selection.qId,
                answer: selection.answer
            }))
        )
    }
}

export const handleNewQ = (newQuestionInfo) => {
    return (dispatch) => {
        dispatch(showLoading())
        //call DB save q and then send formatted new q to store and invoke callback passed in to redirect to homepage
        return _saveQuestion(newQuestionInfo)
        .then((newQ) => {
            dispatch(addQuestion(newQ))
        })
        .then(() => dispatch(hideLoading()))
        .catch(err => {
            alert('error saving new qustion, please try again')
            console.log('error', err)
        })
    }
}

/**
 * regular action creators
 */
const saveAnswer = (answerInfo) => {
    return {
        type: SAVE_ANSWER,
        answerInfo
    }
}

const addQuestion = (newQ) => {
    return {
        type: ADD_QUESTION,
        newQ
    }
}