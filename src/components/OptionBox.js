import React from 'react'
import { ReactComponent as Tick } from '../icons/tick.svg'
import { connect } from 'react-redux'

/**
 * returns the html for a reusable option box in qpage, has user choice and
 * stats auto hidden only revealed when a choice has been made
 */
const OptionBox = (props) => {
    const { qAnswered, userAnswers, id } = props
    //set out what classes to add to the optionBox depending on props
    let classes = 'option-box'
    //if the question this box is for is answered by the user then remove button capabilities
    if(qAnswered.length === 1) {
        classes += ' no-click'
        //as it's answered check to see if this option is the users selection, if so add class to highlight it
        if(userAnswers[qAnswered] === id) {
            classes += ' selected-option'
        }
    }
    //stats numbers div shows both number of votes for this answer with total votes for poll
    //plus percentage of votes
    return(
        <div id={props.id} className={classes} onClick={() => props.click(props.id)}>
            <div className='option-title'>{props.info.text}</div>
            <Tick />
            {props.qAnswered.length !== 0 && (
                <div className='option-stats'>
                <h4 className='stats-title'>Votes:</h4>
                <div className='stats-numbers'>
                    <p>{props.info.votes.length} / {props.votesNum}</p>
                    <p>{Math.round((props.info.votes.length / props.votesNum) * 100)}%</p>
                </div>
            </div>
            )}
        </div>
    )
}

//maps props to see if the question the box is for is answered by matching user answers to passed in qId
//also, maps the users answers for the component to match it's id against the qAnswered id, if true the this box is the selected one
const mapStateToProps = ({ authedUser, users }, props) => {
    return {
        qAnswered: Object.keys(users[authedUser].answers).filter(answer => answer === props.qId),
        userAnswers: users[authedUser].answers
    }
}

export default connect(mapStateToProps)(OptionBox)