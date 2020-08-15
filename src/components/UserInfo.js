import React, { Component } from 'react'
import { connect } from 'react-redux'

import Avatar from './Avatar'

class UserInfo extends Component {
    render() {

        const { user } = this.props
        console.log('userinfo user id:', user)
        //TODO: alternatively, place in default image if no authedUser set yet
        return(
            <div className='user-info'>
                <Avatar id={user} />
                <p>Logged in: {user}</p>
            </div>
        )
    }
}

const mapStateToProps = ({authedUser}) => {
    console.log('user info:', authedUser)
    return {
        user: authedUser
    }
}

export default connect(mapStateToProps)(UserInfo)