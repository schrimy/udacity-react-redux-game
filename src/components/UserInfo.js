import React, { Component, Fragment } from 'react'
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
                    <Fragment>
                        <p>Logged in: {user}</p>
                        <button onClick={this.handleLogOut}>Log out</button>
                    </Fragment>
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