import React, { Component } from 'react'
import { connect } from 'react-redux'
import { logoutUser } from '../actions/authedUser'
import { withRouter } from 'react-router-dom'

import Avatar from './Avatar'

class UserInfo extends Component {
    //called when ogout btn clicked dispatches logout to make authedUser null
    //and redirects user to home page and login screen
    handleLogOut = (evt) => {
        evt.preventDefault()
        //use the function to fire action from mapDispatchToProps
        this.props.logoutUser()
        this.props.history.push('/')
    }
    //displays logout button and user name if logged in
    render() {
        const { user } = this.props

        return(
            <div className='user-info'>
                <Avatar id={user} />
                {user !== null && (
                    <div className='info-text'>
                        <p className='user-name'>{user}</p>
                        <button className='login-info-btn'
                            onClick={this.handleLogOut}>
                            Log out
                        </button>
                    </div>
                )}
            </div>
        )
    }
}

const mapStateToProps = ({ authedUser }) => {
    return {
        user: authedUser
    }
}

//uses 2nd connect argument for mapDispatchToProps
export default withRouter(connect(mapStateToProps, { logoutUser })(UserInfo))