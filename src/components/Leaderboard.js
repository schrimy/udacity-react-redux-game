import React from  'react'
import { connect } from 'react-redux'

import UserCard from './UserCard'

const LeaderBoard = (props) => {
    const { usersList } = props

    return(
        <div className='leaderboard'>
            <ul>
                {usersList.map((user, index) => (
                    <UserCard key={user.id} id={user.id} position={index+=1} />
                ))}
            </ul>
        </div>
    )
}

const mapStateToProps = ({ users }) => {
    return {
        usersList: Object.values(users)
        .sort((a,b) => (Object.values(b.answers).length + b.questions.length)
            - (Object.keys(a.answers).length + a.questions.length))
    }
}

export default connect(mapStateToProps)(LeaderBoard)