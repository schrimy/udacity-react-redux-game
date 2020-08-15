import React from 'react'
import { connect } from 'react-redux'

import Qcard from '../components/Qcard'

const Qlist = (props) => {
    console.log('Qlist props: ', props.qId)

    return(
        <div className='q-container'>
            <button className='btn to-answer'>Unanswered</button>
            <button className='btn answered'>Answered</button>
            <ul className='q-list'>
                {props.qId.map((id) => (
                    <li key={id}>
                        <Qcard id={id} />
                    </li>
                ))}
            </ul>
        </div>
    )
}

const mapStateToProps = ({questions}) => {
    //grab id keys of questions state to pass into card so card can grab q info from state
    return {
        qId: Object.keys(questions)
    }
}

export default connect(mapStateToProps)(Qlist)