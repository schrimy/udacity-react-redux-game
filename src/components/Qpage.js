import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, withRouter } from 'react-router-dom'
import { handleOptionSelected } from '../actions/shared'

import Avatar from './Avatar'
import OptionBox from './OptionBox'

class Qpage extends Component {
    //make sure the option vote satst start out invisible
    componentDidMount() {
        document.querySelectorAll('.option-stats')
        .forEach(stat => {
            stat.setAttribute('style', 'display: none')
        })

        //check if user has already answered question
        this.checkUserAnswers()
    }

    //if updated by option selection show which the user has chosen
    componentDidUpdate() {
        this.checkUserAnswers()
    }

    //compare users answers against displayed question id, if a match show which option the user selected
    checkUserAnswers = () => {
        const { userAnswers, question_id } = this.props
        //grab keys from answers object so it can be iterable and check if it's been answered by user
        Object.keys(userAnswers).forEach(answer => {
            if(answer === question_id) {
                this.displayAnsweredInfo(userAnswers[question_id])
                //disable click events on option boxes
                document.querySelectorAll('.option-box').forEach(box => {
                    box.classList.add('no-click')
                })
            }
        })
    }

    //if question has been answered bu authedUser then show which option selected and stats for both
    displayAnsweredInfo = (optionSelected) => {
        const selectedOption = document.querySelector(`#${optionSelected}`)

        selectedOption.classList.add('selected-option')
        //unhide stats for both options
        document.querySelectorAll('.option-stats')
        .forEach(stat => {
            stat.removeAttribute('style')
        })
    }
    //called when an option is clicked, dispatches action to save which user chose which option
    handleOptionClick = (id) => {
        const { qToShow, authedUser, dispatch } = this.props

        dispatch(handleOptionSelected({
            authedUser,
            qId: qToShow.id,
            answer: id
        }))
    }

    render() {
        //which question a re we displaying
        const { qToShow } = this.props
        //if question doesn't exist redirect to 404
        if(qToShow === undefined) {
            return <Redirect to='/404' />
        }
        //determine how many votes this question has had
        const votesTotal = qToShow.optionOne.votes.length + qToShow.optionTwo.votes.length
        
        return(
            <div className='qpage-container'>
                <Avatar id={qToShow.author} />
                <h1>Would you rather</h1>
                <div className='options-container'>
                    <OptionBox
                        click={this.handleOptionClick}
                        id='optionOne'
                        info={qToShow.optionOne}
                        votesNum={votesTotal} />
                    <OptionBox
                        click={this.handleOptionClick}
                        id='optionTwo'
                        info={qToShow.optionTwo}
                        votesNum={votesTotal} />
                </div>
            </div>
        )
    }
}
//maps the passed in question id from url, who is signed in so username can be saved against an answer
//userAnswers to check if this question has already been answered
const mapStateToProps = ({ authedUser, users, questions }, props) => {
    //grab param from url / router that passes the question id ':question_id'
    const { question_id } = props.match.params

    return {
        question_id,
        authedUser,
        userAnswers: users[authedUser].answers,
        qToShow: questions[question_id]
    }
}

export default withRouter(connect(mapStateToProps)(Qpage))