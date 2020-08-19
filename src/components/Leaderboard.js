import React, { Component } from  'react'
import { connect } from 'react-redux'

class LeaderBoard extends Component {
    render() {
        const { usersList } = this.props

        return(
            <div>
                <ul>
                    {Object.keys(usersList).map((user) => (
                        <li key={user}>{user}</li>
                    ))}
                </ul>
            </div>
        )
    }
}

const mapStateToProps = ({ users }) => {
    return {
        usersList: users
    }
}

export default connect(mapStateToProps)(LeaderBoard)