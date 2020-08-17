import React, { Component } from 'react'
import { connect } from 'react-redux'

import Avatar from './Avatar'
import OptionBox from './OptionBox'

class Qpage extends Component {
    componentDidMount() {
        const { userAnswers, qId } = this.props

        document.querySelectorAll('.option-stats')
        .forEach(stat => {
            stat.setAttribute('style', 'display: none')
        })

        //grab keys from answers object so it can be iterable
        Object.keys(userAnswers).forEach(answer => {
            if(answer === qId) {
                this.displayAnsweredInfo(userAnswers[qId])
            }
        })
    }

    //TODO:if answered make sure options have no button attributes eg pointer
    //if question has been answered bu authedUser then show which option selected and stats
    displayAnsweredInfo = (optionSelected) => {
        document.querySelector(`#${optionSelected}`).classList.add('selected-option')
        document.querySelectorAll('.option-stats')
        .forEach(stat => {
            stat.removeAttribute('style')
        })
    }

    render() {
        const { qToShow, votes } = this.props
        console.log('q to show:', qToShow)
        return(
            <div className='qpage-container'>
                <Avatar id={qToShow.author} />
                <p>Would you rather</p>
                <OptionBox id='optionOne' info={qToShow.optionOne} votesNum={votes} />
                <OptionBox id='optionTwo' info={qToShow.optionTwo} votesNum={votes} />
            </div>
        )
    }
}

const mapStateToProps = ({ authedUser, users, questions }, { qId }) => {
    return {
        userAnswers: users[authedUser].answers,
        qToShow: questions[qId],
        votes: questions[qId].optionOne.votes.length + questions[qId].optionTwo.votes.length
    }
}

export default connect(mapStateToProps)(Qpage)