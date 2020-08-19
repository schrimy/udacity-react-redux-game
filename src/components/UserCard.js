import React from 'react'
import { connect } from 'react-redux'

import Avatar from './Avatar'

const UserCard = (props) => {
    const { id, userName, numQasked, numQanswered } = props

    return(
        <div className='user-card'>
            <Avatar id={id} />
            <section className='user-card-info'>
                <h3>{userName}</h3>
                <p>Answered {numQanswered} questions</p>
                <p>Asked {numQasked} questions</p>
                <p>Score total: {numQanswered + numQasked}</p>
            </section>
        </div>
    )
}

const mapStateToProps = ({ users }, {id}) => {
    return {
        userName: users[id].name,
        numQasked: users[id].questions.length,
        numQanswered: Object.keys(users[id].answers).length
    }
}

export default connect(mapStateToProps)(UserCard)