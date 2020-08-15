import React from 'react'
import { connect } from 'react-redux'
import Avatar from './Avatar'

const Qcard = (props) => {
    const { author, optionText } = props

    return(
        <div className='q-card'>
            <Avatar id={author} />
            <section>
                <p>{author} asks:</p>
                <p>Would you rather</p>
                <p>{optionText}</p>
            </section>
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