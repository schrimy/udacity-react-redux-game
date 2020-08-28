import React, { Component } from 'react'
import { connect } from 'react-redux'

import Avatar from './Avatar'

class UserCard extends Component {
    //determine if in top three and assign relevant colour class for background
    componentDidMount() {
        const { position } = this.props
        const backgroundColour = document.createElement('div')
        //if current user is in top three then add a ranking background
        if(position < 4) {
            backgroundColour.className = 'background-circle'
            const currentCard = document.querySelectorAll('.position')[position - 1]
            currentCard.appendChild(backgroundColour)
        }

        //if the passed in position is between 1-3 then assign a relevenat background color to ranking
        switch(position) {
            case 1:
                backgroundColour.classList.add('gold')
                break
            case 2:
                backgroundColour.classList.add('silver')
                break
            case 3:
                backgroundColour.classList.add('bronze')
                break
            default:
                return
        }
    }
    
    render() {
        const { id, position, user, userName, numQasked, numQanswered } = this.props

        return(
            <div className='user-card'>
                <div className='position'>
                    <p>{position}</p>
                </div>
                <Avatar id={id} />
                <section className='user-card-info'>
                    <h3>{user}</h3>
                    <p><em>( {userName} )</em></p>
                    <p>Answered {numQanswered} questions</p>
                    <p>Asked {numQasked} questions</p>
                    <p>Score total: {numQanswered + numQasked}</p>
                </section>
            </div>
        )
    }
}
//maps the user's name number of questions asked and answered to display
//passed position determines the displayed position and if it has a background image for ranking
const mapStateToProps = ({ users }, { id, position }) => {
    return {
        user: users[id].name,
        userName: users[id].id,
        numQasked: users[id].questions.length,
        numQanswered: Object.keys(users[id].answers).length
    }
}

export default connect(mapStateToProps)(UserCard)