import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => {
    return(
        <nav className='nav'>
            <Link className='nav-btn' to='/'>Home</Link>
            <Link className='nav-btn' to='/add'>New Q</Link>
            <Link className='nav-btn' to='/leaderboard' >Leaderboard</Link>
        </nav>
    )
}

export default Nav