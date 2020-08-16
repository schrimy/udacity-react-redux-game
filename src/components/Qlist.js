import React, { Component } from 'react'
import { connect } from 'react-redux'

import Qcard from './Qcard'

class Qlist extends Component {
    //TODO: does state get set to blank when user logs out?
    state = {
        displayQs: []
    }

    //set initial questions list
    //if logged out show full q list, logged in = unanswered qs, via userAnswers prop
    componentDidMount() {
        const { qIds, userAnswers } = this.props

        this.setState(() => ({
            displayQs: userAnswers === null ? qIds : qIds.filter(this.answerChecker)
        }))

        if(userAnswers !== null) {
            document.querySelector('.to-answer').classList.add('btn-active')
        }
    }

    //when requesting unanswered q's help remove those that have been answered
    answerChecker = (id) => {
        let match = false
        const { userAnswers } = this.props

        userAnswers.forEach(answer => {
            if(id === answer) {
                match = true
            }
        })

        return !match ? id : null
    }

    //called when unaswered btn clicked to show unanswered qs
    handleToAnswer = (evt) => {
        evt.preventDefault()
        evt.target.classList.add('btn-active')
        evt.target.nextElementSibling.classList.remove('btn-active')

        const { qIds } = this.props

        this.setState(() => ({
            displayQs: qIds.filter(this.answerChecker)
        }))
    }

    //called when aswered btn clicked to show answered qs
    //TODO: sort order via cross referenced timestamp 
    handleAnswered = (evt) => {
        evt.preventDefault()
        evt.target.classList.add('btn-active')
        evt.target.previousElementSibling.classList.remove('btn-active')

        const { userAnswers } = this.props

        this.setState(() => ({
            displayQs: userAnswers
        }))
    }

    render() {
        const { displayQs } = this.state

        return(
            <div className='q-container'>
                <button className='btn to-answer' onClick={this.handleToAnswer}>Unanswered</button>
                <button className='btn answered' onClick={this.handleAnswered}>Answered</button>
                <ul className='q-list'>
                    {displayQs.map((id) => (
                        <li key={id}>
                            <Qcard id={id} />
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

const mapStateToProps = ({questions, users, authedUser}) => {
    //grab id keys of questions state to pass into card so card can grab q info from state
    return {
        userAnswers: authedUser !== null ? Object.keys(users[authedUser].answers) : null,
        qIds: Object.keys(questions)
        .sort((a,b) => questions[b].timestamp - questions[a].timestamp)
    }
}

export default connect(mapStateToProps)(Qlist)