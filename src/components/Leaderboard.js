import React from  'react'
import { connect } from 'react-redux'

const LeaderBoard = (props) => {
    const { usersList } = props

    return(
        <div>
            <ul>
                {usersList.map((user) => (
                    <li key={user.id}>{user.name}</li>
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