import { _getUsers, _getQuestions, _saveQuestionAnswer, _saveQuestion } from '../utils/_DATA'
import { receiveUsers } from './users'
import { receiveQuestions } from './questions'
import { SAVE_ANSWER, ADD_QUESTION } from '../constants/actionTypes'
import { showLoading, hideLoading } from 'react-redux-loading'

/**
 * async / thunk action creators
 */
//called when app starts up, grabs intial data from mock backend and sends to
//reducer to populate store state
export const handleInitialData = () => {
    return (dispatch) => {
        dispatch(showLoading())
        return Promise.all([_getUsers(), _getQuestions()])
        .then(([users, questions]) => {
            dispatch(receiveUsers(users))
            dispatch(receiveQuestions(questions))
            dispatch(hideLoading())
        })
        .catch(err => {
            console.log('Error retrieving data:', err)
        })
    }
}

//called when user slects a question answer, first sends info to backend then
//dispatches to reducer for store state to record who answered what
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
        .catch(err => {
            alert('error saving selected vote, please try again')
            console.log('error', err)
        })
    }
}

//called when a new quesition is created fromt he form, first saves in backend
//then dispatches info to reducer to place in store state
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