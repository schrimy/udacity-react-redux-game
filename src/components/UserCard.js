import React, { Component } from 'react'
import { connect } from 'react-redux'

import Avatar from './Avatar'

class UserCard extends Component {
    //determine if in top three and assign relevant colour class for bakground
    componentDidMount() {
        const currentCard = document.querySelectorAll('.background-circle')[this.props.position - 1]

        switch(this.props.position) {
            case 1:
                currentCard.classList.add('gold')
                return
            case 2:
                currentCard.classList.add('silver')
                return
            case 3:
                currentCard.classList.add('bronze')
                return
            default:
                return
        }
    }
    
    render() {
        const { id, position, userName, numQasked, numQanswered } = this.props

        return(
            <div className='user-card'>
                <div className='position'>
                    <div className='background-circle'></div>
                    <p>{position}</p>
                </div>
                <Avatar id={id} />
                <section className='user-card-info'>
                    <h3>{userName}</h3>
                    <p>Answered {numQanswered} questions</p>
                    <p>Asked {numQasked} questions</p>
                    <p>Score total: {numQanswered + numQasked}</p>
                </section>
            </div>
        )
    }
}

const mapStateToProps = ({ users }, {id, position}) => {
    return {
        userName: users[id].name,
        numQasked: users[id].questions.length,
        numQanswered: Object.keys(users[id].answers).length
    }
}

export default connect(mapStateToProps)(UserCard)