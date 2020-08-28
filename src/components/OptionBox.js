import React from 'react'
import { ReactComponent as Tick } from '../icons/tick.svg'

/**
 * returns the html for a reusable option box in qpage, has user choice and
 * stats auto hidden only revealed when a choice has been made
 */
const OptionBox = (props) => {
    //stats numbers div shows both number of votes for this answer with toatl votes for poll
    //plus percentage of votes
    return(
        <div id={props.id} className='option-box' onClick={() => props.click(props.id)}>
            <div className='option-title'>{props.info.text}</div>
            <Tick />
            <div className='option-stats'>
                <h4 className='stats-title'>Votes:</h4>
                <div className='stats-numbers'>
                    <p>{props.info.votes.length} / {props.votesNum}</p>
                    <p>{Math.round((props.info.votes.length / props.votesNum) * 100)}%</p>
                </div>
            </div>
        </div>
    )
}

export default OptionBox