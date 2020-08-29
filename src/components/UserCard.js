import React from 'react'
import { connect } from 'react-redux'

import Avatar from './Avatar'
import PositionBadge from './PositionBadge'

const UserCard = (props) => {
    const { id, position, user, userName, numQasked, numQanswered } = props

    return(
        <div className='user-card'>
            <PositionBadge position={position}/>
            <Avatar id={id} />
            <section className='user-card-info'>
                <h3>{user}</h3>
                <p><em>( {userName} )</em></p>
                <p>Answered {numQanswered} questions</p>
                <p>Asked {numQasked} questions</p>
                <p>Score total: {numQanswered + numQasked}</p>
            </section>
        </div>
    )
}
//maps the user's name number of questions asked and answered to display
//passed position determines the displayed position and if it has a background image for ranking
const mapStateToProps = ({ users }, { id, position }) => {
    return {
        user: users[id].name,
        userName: users[id].id,
        numQasked: users[id].questions.length,
        numQanswered: Object.keys(users[id].answers).length
    }
}

export default connect(mapStateToProps)(UserCard)