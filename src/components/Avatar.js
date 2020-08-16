import React from 'react'
import { connect } from 'react-redux'
import * as defaultImg from '../images/default-avatar.jpg'

const Avatar = (props) => {
    return(
        <img className='avatar' src={props.img} alt='user avatar'></img>
    )
}

const mapStateToProps = ({users}, {id}) => {
    return {
        img: id !== null ? users[id].avatarURL : defaultImg
    }
}

export default connect(mapStateToProps)(Avatar)