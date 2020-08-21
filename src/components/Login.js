import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loginUser } from '../actions/authedUser'
import { adddUser } from '../actions/users'

class Login extends Component {
    handleLogin = (evt) => {
        evt.preventDefault()
        const { users, userIds } = this.props

        const validUser = userIds.filter((user) => user === this.refs.valueOne.value)
        if(validUser.length > 0 && this.refs.valueTwo.value === users[validUser].password) {
            this.props.dispatch(loginUser(validUser))
        } else {
            alert('Username or password not recognised, please try again')
        }
    }

    render() {
        return(
            <div className='login-container'>
                <div className='login-box'>
                    <h2>Would you Rather</h2>
                    <p>Please Login</p>
                    <form onSubmit={this.handleLogin}>
                        <input type='text' placeholder='Username' ref='valueOne' />
                        <input type='text' placeholder='Password' ref='valueTwo' />
                        <button type='submit'>Submit</button>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ users }) => {
    return {
        users,
        userIds: Object.keys(users)
    }
}

export default connect(mapStateToProps)(Login)