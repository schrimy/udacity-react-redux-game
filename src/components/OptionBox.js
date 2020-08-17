import React from 'react'

const OptionBox = (props) => {
    return(
        <div id={props.id} className='option-box' onClick={props.click}>
            {props.info.text}
            <div className='option-stats'>
                <p>{props.info.votes.length} / {props.votesNum}</p>
                <p>{(props.info.votes.length / props.votesNum) * 100}%</p>
            </div>
        </div>
    )
}

export default OptionBox