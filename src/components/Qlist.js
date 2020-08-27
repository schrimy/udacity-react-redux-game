import React, { Component } from 'react'
import { connect } from 'react-redux'

import Qcard from './Qcard'

class Qlist extends Component {
    state = {
        answered: false
    }

    //set initial active button if logged in
    componentDidMount() {
        if(this.props.userAnswers !== null) {
            document.querySelector('.to-answer').classList.add('btn-active')
        }
    }

    //when requesting q's to display send back qIds that either match answered list or not
    //based on the boolean value sent through from fliter method + id of q from full list
    answerChecker = (id, toMatch) => {
        let match = toMatch
        const { userAnswers } = this.props

        userAnswers.forEach(answer => {
            if(id === answer) {
                match = !match
            }
        })

        return !match ? id : null
    }

    //called when unaswered btn clicked to show unanswered qs
    handleToAnswer = (evt) => {
        evt.preventDefault()
        evt.target.classList.add('btn-active')
        evt.target.nextElementSibling.classList.remove('btn-active')

        this.setState(() => ({
            answered: false
        }))
    }

    //called when aswered btn clicked to show answered qs
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
            //show unanswered questions
            displayQs = userAnswers === null ? qIds : qIds.filter(id => this.answerChecker(id, false))
        } else {
            //show users answered questions
            displayQs = userAnswers === null ? null : qIds.filter(id => this.answerChecker(id, true))
        }

        return(
            <div className='q-container'>
                <button className='btn to-answer' onClick={this.handleToAnswer}>Unanswered</button>
                <button className='btn answered' onClick={this.handleAnswered}>Answered</button>
                <ul className='q-list'>
                    {displayQs.map((id) => (
                        <Qcard key={id} id={id} />
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