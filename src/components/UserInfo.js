import React, { Component } from 'react'
import { connect } from 'react-redux'

import Avatar from './Avatar'

class UserInfo extends Component {
    render() {
        const { user } = this.props

        return(
            <div className='user-info'>
                <Avatar id={user} />
                <p>Logged in: {user}</p>
            </div>
        )
    }
}

const mapStateToProps = ({authedUser}) => {
    return {
        user: authedUser
    }
}

export default connect(mapStateToProps)(UserInfo)