import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleNewQ } from '../actions/shared'

class NewQ extends Component {
    state = {
        optionOne: '',
        optionTwo: ''
    }

    handleChange = (evt) => {
        const { value, name } = evt.target

        this.setState(() => ({
            [name]: value
        }))
    }

    handleSubmit = (evt) => {
        evt.preventDefault()
        const { optionOne, optionTwo } = this.state
        const { author } = this.props

        this.props.dispatch(handleNewQ({
            author,
            optionOneText: optionOne,
            optionTwoText: optionTwo
        }))
        //.then(() => {
            this.props.history.push('/')
        //})

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

const mapStateToProps = ({ authedUser }) => {
    return {
        author: authedUser
    }
}

export default connect(mapStateToProps)(NewQ)