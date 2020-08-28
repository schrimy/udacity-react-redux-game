import React from 'react'
import { connect } from 'react-redux'
import * as defaultImg from '../images/default-avatar.jpg'

const Avatar = (props) => {
    return(
        <img
            className='avatar'
            src={props.img}
            alt='user avatar'>
        </img>
    )
}

//if no user id is passed in then use default image otherwise grab avatar url from store
const mapStateToProps = ({users}, {id}) => {
    return {
        img: id !== null ? users[id].avatarURL : defaultImg
    }
}

export default connect(mapStateToProps)(Avatar)