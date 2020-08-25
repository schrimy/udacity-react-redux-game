import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loginUser } from '../actions/authedUser'
import { handleNewUser } from '../actions/users'

class Login extends Component {
    state = {
        status: 'login',
        valueOne: '',
        valueTwo: '',
        newUserName: '',
        newName: '',
        newPassword: ''
    }

    //check entered login field values against store to validate user
    handleLogin = (evt) => {
        evt.preventDefault()
        const { users, userIds } = this.props
        const { valueOne, valueTwo } = this.state

        const validUser = userIds.filter((user) => user === valueOne)
        if(validUser.length > 0 && valueTwo === users[validUser].password) {
            this.props.dispatch(loginUser(validUser))
            this.props.history.push(this.props.location.state.from)
        } else {
            alert('Username or password not recognised, please try again')
        }
    }

    //send off new user details to be enetered into store state and then navigate to login fields
    handleSignUp = (evt) => {
        evt.preventDefault()
        const { newName, newUserName, newPassword } = this.state

        this.props.dispatch(handleNewUser({
            name: newName,
            username: newUserName,
            password: newPassword
        }))
        .then(() => {
            this.backToLogin()
        })
    }

    //render login fields
    backToLogin = (evt) => {
        if(evt !== undefined) {
            evt.preventDefault()
        }

        this.setState(() => ({
            status: 'login',
            valueOne: '',
            valueTwo: ''
        }))
    }

    //render signup fields
    toSignUp = (evt) => {
        evt.preventDefault()

        this.setState(() => ({
            status: 'signup',
            newUserName: '',
            newName: '',
            newPassword: ''
        }))
    }

    //check signup fields to enable submit btn
    checkSignUp = () => {
        const { newName, newUserName, newPassword, submitSignUp } = this.refs

        this.setState(() => ({
            newName: newName.value,
            newUserName: newUserName.value,
            newPassword: newPassword.value
        }))
        
        if(newName.value !== '' && newUserName.value !== '' && newPassword.value !== '') {
            submitSignUp.disabled = false
        }
    }

    //check login fields to enable submit btn
    checkLogin = () => {
        const { valueOne, valueTwo, loginSubmit } = this.refs

        this.setState(() => ({
            valueOne: valueOne.value,
            valueTwo: valueTwo.value
        }))
        
        if(valueOne.value !== '' && valueTwo.value !== '') {
            loginSubmit.disabled = false
        }
    }

    render() {
        const { status, valueOne, valueTwo, newName, newUserName, newPassword } = this.state

        return(
            <div className='login-container'>
                <div className='login-box'>
                    <h2>Would you Rather</h2>
                    <p>Please Login</p>
                    {status === 'login'
                        ? <form onSubmit={this.handleLogin}>
                            <input className='login-text' type='text' placeholder='Username' ref='valueOne' value={valueOne} onChange={this.checkLogin} />
                            <input className='login-text' type='text' placeholder='Password' ref='valueTwo' value={valueTwo} onChange={this.checkLogin} />
                            <button className='login-btn' disabled={true} type='submit' ref='loginSubmit'>Login</button>
                            <button className='login-btn' onClick={this.toSignUp}>Sign Up</button>
                        </form>
                        : <form onSubmit={this.handleSignUp} onChange={this.checkSignUp}>
                            <input className='login-text' type='text' placeholder='Name' ref='newName' value={newName} onChange={this.checkSignUp}/>
                            <input className='login-text' type='text' placeholder='Username' ref='newUserName' value={newUserName} onChange={this.checkSignUp}/>
                            <input className='login-text' type='text' placeholder='Password' ref='newPassword' value={newPassword} onChange={this.checkSignUp}/>
                            <button className='login-btn' disabled={true} type='submit' ref='submitSignUp'>Submit</button>
                            <button className='login-btn' onClick={this.backToLogin}>Cancel</button>
                        </form>
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ users }, { state }) => {
    return {
        users,
        userIds: Object.keys(users),
        state
    }
}

export default connect(mapStateToProps)(Login)