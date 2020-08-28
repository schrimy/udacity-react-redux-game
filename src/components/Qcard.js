import React from 'react'
import { connect } from 'react-redux'
import Avatar from './Avatar'
import { Link } from 'react-router-dom'

const Qcard = (props) => {
    const { author, optionText, id } = props
    //links to qpage for details of this question
    return(
        <Link to={`questions/${id}`} className='q-card'>
            <Avatar id={author} />
            <section>
                <p>{author} asks:</p>
                <p>Would you rather</p>
                <p>{optionText}</p>
            </section>
        </Link>
    )
}
//maps state of question author and first option to display in the card
const mapStateToProps = ({ questions }, { id }) => {
    return {
        author: questions[id].author,
        optionText: questions[id].optionOne.text
    }
}

export default connect(mapStateToProps)(Qcard)