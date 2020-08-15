import React from 'react'
import { connect } from 'react-redux'

const Qcard = (props) => {
    const { author, optionText } = props

    return(
        <div className='q-card'>
            {`${author} asks: ${optionText}`}
        </div>
    )
}

const mapStateToProps = ({questions}, {id}) => {
    return {
        author: questions[id].author,
        optionText: questions[id].optionOne.text
    }
}

export default connect(mapStateToProps)(Qcard)