import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, withRouter } from 'react-router-dom'
import { handleOptionSelected } from '../actions/shared'

import Avatar from './Avatar'
import OptionBox from './OptionBox'

class Qpage extends Component {
    //called when an option is clicked, dispatches action to save which user chose which option
    handleOptionClick = (id) => {
        const { qToShow, authedUser, handleOptionSelected } = this.props
        //dispatchable function via mapDispatchToProps
        handleOptionSelected({
            authedUser,
            qId: qToShow.id,
            answer: id
        })
    }

    render() {
        //which question are we displaying
        const { qToShow } = this.props
        //if question doesn't exist redirect to 404
        if(qToShow === undefined) {
            return <Redirect to='/404' />
        }
        //determine how many votes this question has had
        const votesTotal = qToShow.optionOne.votes.length + qToShow.optionTwo.votes.length
        //send each option its parent question id, click function, its own id to compare with user answers, option text, total votes for display
        return(
            <div className='qpage-container'>
                <Avatar id={qToShow.author} />
                <h1>Would you rather</h1>
                <div className='options-container'>
                    <OptionBox
                        qId={qToShow.id}
                        click={this.handleOptionClick}
                        id='optionOne'
                        info={qToShow.optionOne}
                        votesNum={votesTotal} />
                    <OptionBox
                        qId={qToShow.id}
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
const mapStateToProps = ({ authedUser, questions }, props) => {
    //grab param from url / router that passes the question id ':question_id'
    const { question_id } = props.match.params

    return {
        authedUser,
        qToShow: questions[question_id]
    }
}

export default withRouter(connect(mapStateToProps, { handleOptionSelected })(Qpage))