import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loginUser } from '../actions/authedUser'
import { handleNewUser } from '../actions/users'

class Login extends Component {
    /**
     * local state to determine when btns can be activated and when
     * it needs to show the sign up screen
     */
    state = {
        status: 'login',
        valueOne: '',
        valueTwo: '',
        newUserName: '',
        newName: '',
        newPassword: ''
    }

    //when updated check to see if now signed in, if true then go to previously
    //requested page or home page
    componentDidUpdate() {
        const { history, location, authedUser } = this.props

        if(authedUser !== null) {
            history.push(location.state.from || '/')
        }
    }

    //check entered login field values against store to validate user
    handleLogin = (evt) => {
        evt.preventDefault()
        const { users, userIds, dispatch, history, location } = this.props
        const { valueOne, valueTwo } = this.state

        //checks if login details are valid against current user list
        const validUser = userIds.filter((user) => user === valueOne)

        if(validUser.length > 0 && valueTwo === users[validUser].password) {
            dispatch(loginUser(validUser))
            history.push(location.state.from || '/')
        } else {
            alert('Username or password not recognised, please try again')
        }
    }

    //send off new user details to be enetered into store state and then navigate to login fields
    handleSignUp = (evt) => {
        evt.preventDefault()
        const { newName, newUserName, newPassword } = this.state
        const { userIds, dispatch } = this.props

        //check if username is already in use via iterating over current users
        //if in use return out of function and clear username field and display alert
        const userNameUsed = userIds.filter((user) => user === newUserName)
        if(userNameUsed.length !== 0) {
            alert('username already in use, please choose another and try again')
            this.setState(() => ({
                newUserName: ''
            }))
            return
        }
        //dispatch new user details to db and store
        dispatch(handleNewUser({
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
        //is not always called by button event
        if(evt !== undefined) {
            evt.preventDefault()
        }
        //clear fields and show login fields
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
    //called when sign up input field changes
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
    //called when login field is changed
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
    //render either login or sign up fields dependent on local state
    render() {
        const { status, valueOne, valueTwo, newName, newUserName, newPassword } = this.state

        return(
            <div className='login-container'>
                <div className='login-box'>
                    <h2>Would you Rather</h2>
                    <p>Please Login</p>
                    {status === 'login'
                        ? <form onSubmit={this.handleLogin}>
                            <input className='login-text'
                                type='text'
                                placeholder='Username'
                                ref='valueOne'
                                value={valueOne}
                                onChange={this.checkLogin} />
                            <input className='login-text'
                                type='text'
                                placeholder='Password'
                                ref='valueTwo'
                                value={valueTwo}
                                onChange={this.checkLogin} />
                            <button className='login-btn'
                                disabled={true}
                                type='submit'
                                ref='loginSubmit'>
                                    Login
                            </button>
                            <button className='login-btn'
                                onClick={this.toSignUp}>
                                    Sign Up
                            </button>
                        </form>
                        : <form onSubmit={this.handleSignUp}>
                            <input className='login-text'
                                type='text'
                                placeholder='Name'
                                ref='newName'
                                value={newName}
                                onChange={this.checkSignUp} />
                            <input className='login-text'
                                type='text'
                                placeholder='Username'
                                ref='newUserName'
                                value={newUserName}
                                onChange={this.checkSignUp} />
                            <input className='login-text'
                                type='text'
                                placeholder='Password'
                                ref='newPassword'
                                value={newPassword}
                                onChange={this.checkSignUp} />
                            <button className='login-btn'
                                disabled={true}
                                type='submit'
                                ref='submitSignUp'>
                                    Submit
                            </button>
                            <button className='login-btn'
                                onClick={this.backToLogin}>
                                    Cancel
                            </button>
                        </form>
                    }
                </div>
            </div>
        )
    }
}
//state here is from the router to hold previous page request if any
//rest is used to determine the current user and if logged in
const mapStateToProps = ({ users, authedUser }, { state }) => {
    return {
        users,
        userIds: Object.keys(users),
        authedUser,
        state
    }
}

export default connect(mapStateToProps)(Login)