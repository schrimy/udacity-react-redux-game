import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleNewQ } from '../actions/shared'
import { withRouter } from 'react-router-dom'

class NewQ extends Component {
    //local state to determine when to enable submit button
    state = {
        optionOne: '',
        optionTwo: ''
    }
    //called when input field changes
    handleChange = (evt) => {
        const { value, name } = evt.target

        this.setState(() => ({
            [name]: value
        }))
    }
    //called when the submit btn clicked
    handleSubmit = (evt) => {
        evt.preventDefault()
        const { optionOne, optionTwo } = this.state
        const { author, history } = this.props
        //sends new q info to db / store then redirects to home page
        this.props.dispatch(handleNewQ({
            author,
            optionOneText: optionOne,
            optionTwoText: optionTwo
        }))
        .then(() => {
            history.push('/')
        })
        .catch(err => {
            console.log('error:', err)
            alert('There was a problem saving new question, please try again')
        })
        //clears input fields
        this.setState(() => ({
            optionOne: '',
            optionTwo: ''
        }))
    }

    render() {
        const { optionOne, optionTwo } = this.state

        return(
            <div className='form-container'>
                <h1>Would you rather</h1>
                <form className='newq-form' onSubmit={this.handleSubmit}>
                    <textarea
                        value={optionOne}
                        name='optionOne'
                        onChange={this.handleChange}
                        className='option-text'
                        placeholder="Option One" />
                    <textarea
                        value={optionTwo}
                        name='optionTwo'
                        onChange={this.handleChange}
                        className='option-text'
                        placeholder="Option Two" />
                    <button
                        className='submit-btn'
                        type='submit'
                        disabled={optionOne === '' || optionTwo === ''}>
                        Submit
                    </button>
                </form>
            </div>
        )
    }
}
//authedUser mapped so dispatch of new Q can be associated with user when saved
const mapStateToProps = ({ authedUser }) => {
    return {
        author: authedUser
    }
}

export default withRouter(connect(mapStateToProps)(NewQ))