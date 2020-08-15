import React from 'react'
import { connect } from 'react-redux'

const Avatar = (props) => {
    return(
        <img className='avatar' src={props.img} alt='user avatar'></img>
    )
}

const mapStateToProps = ({users}, {id}) => {
    return {
        img: users[id].avatarURL
    }
}

export default connect(mapStateToProps)(Avatar)