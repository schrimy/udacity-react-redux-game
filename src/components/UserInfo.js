import React, { Component } from 'react'
import { connect } from 'react-redux'
import { logoutUser } from '../actions/authedUser'

import Avatar from './Avatar'

class UserInfo extends Component {
    handleLogOut = (evt) => {
        evt.preventDefault()
        this.props.dispatch(logoutUser())
    }

    render() {
        const { user } = this.props

        return(
            <div className='user-info'>
                <Avatar id={user} />
                {user !== null && (
                    <div className='info-text'>
                        <p className='user-name'>{user}</p>
                        <button className='login-info-btn' onClick={this.handleLogOut}>Log out</button>
                    </div>
                )}
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