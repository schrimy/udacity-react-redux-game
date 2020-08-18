import { _getUsers, _getQuestions, _saveQuestionAnswer, _saveQuestion } from '../utils/_DATA'
import { receiveUsers,  } from './users'
import { receiveQuestions } from './questions'
import { loginUser } from './authedUser'
import { SAVE_ANSWER, ADD_QUESTION } from '../constants/actionTypes'
//shared event action for when a new q is created so add to questions list and add to user array of questions made
//also, when a q is answered save user id to option of the question and question answered with option selected to users
//TODO: set up thunk action creator to dispatch info of save answer and new q to users and questions

//mock up an authorised user
const AUTHED_ID = 'sarahedo'

/**
 * async / thunk action creators
 */
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
        _saveQuestion(newQuestionInfo)
        .then((newQ) => {
            console.log('saved question:', newQ)
            dispatch(addQuestion(newQ))
        })
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