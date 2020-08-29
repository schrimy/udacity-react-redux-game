import React, { Component } from 'react'
import { connect } from 'react-redux'

import Qcard from './Qcard'

class Qlist extends Component {
    //local state dertermining which list of questions to render
    state = {
        answered: false
    }

    //when requesting q's to display send back qIds that either match answered list or not
    //based on the boolean value sent through from filter method + id of q from full list
    //i.e. sends back relevant list of answered or unasnswered questions to display
    answerChecker = (id, toMatch) => {
        let match = toMatch
        const { userAnswers } = this.props
        //if question matches answer then set match to opposite of current value
        userAnswers.forEach(answer => {
            if(id === answer) {
                match = !match
            }
        })

        return !match ? id : null
    }

    //called when unaswered btn clicked, shows unanswered qs by setting local state
    handleToAnswer = (evt) => {
        evt.preventDefault()
        evt.target.classList.add('btn-active')
        evt.target.nextElementSibling.classList.remove('btn-active')

        this.setState(() => ({
            answered: false
        }))
    }

    //called when aswered btn clicked to show answered qs by setting local state
    handleAnswered = (evt) => {
        evt.preventDefault()
        evt.target.classList.add('btn-active')
        evt.target.previousElementSibling.classList.remove('btn-active')

        this.setState(() => ({
            answered: true
        }))
    }

    render() {
        const { qIds, userAnswers } = this.props
        const { answered } = this.state
        let displayQs = ''
        //determine which questions to display
        if(!answered) {
            //show unanswered questions, if non answered show all questions
            displayQs = userAnswers === null ? qIds : qIds.filter(id => this.answerChecker(id, false))
        } else {
            //show users answered questions, if non answered show nothing
            displayQs = userAnswers === null ? null : qIds.filter(id => this.answerChecker(id, true))
        }

        return(
            <div className='q-container'>
                <button className='btn to-answer btn-active'
                    onClick={this.handleToAnswer}>
                        Unanswered
                    </button>
                <button className='btn answered'
                    onClick={this.handleAnswered}>
                        Answered
                </button>
                <ul className='q-list'>
                    {displayQs.map((id) => (
                        <Qcard key={id} id={id} />
                    ))}
                </ul>
            </div>
        )
    }
}

//maps list of questions ids answered by current user if any have been answered
//also grabs full list of questions by id and sorts into descending order based on when it was created
const mapStateToProps = ({ questions, users, authedUser }) => {
    //grab id keys of questions store state to pass into card so card can grab q info from state
    return {
        userAnswers: authedUser !== null ? Object.keys(users[authedUser].answers) : null,
        qIds: Object.keys(questions)
        .sort((a,b) => questions[b].timestamp - questions[a].timestamp)
    }
}

export default connect(mapStateToProps)(Qlist)