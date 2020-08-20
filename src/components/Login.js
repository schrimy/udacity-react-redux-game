import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loginUser } from '../actions/authedUser'

class Login extends Component {
    handleChange = (evt) => {
        this.props.dispatch(loginUser(evt.target.value))
    }

    render() {
        const { users, userIds } = this.props

        return(
            <div className='login-container'>
                <div className='login-box'>
                    <h2>Would you Rather</h2>
                    <p>Please Login</p>
                    <form>
                        <select name='users' className='user-selector' onChange={this.handleChange}>
                            <option value=''>Select a user</option>
                            {userIds.map((user) => (
                                <option key={user} value={user}>{users[user].name}</option>
                            ))}
                        </select>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ users }) => {
    return {
        users,
        userIds:  Object.keys(users)
    }
}

export default connect(mapStateToProps)(Login)