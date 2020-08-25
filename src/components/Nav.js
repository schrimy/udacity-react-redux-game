import React from 'react'
import { NavLink } from 'react-router-dom'

//TODO: change Link to NavLink
const Nav = () => {
    return(
        <nav className='nav'>
            <NavLink activeClassName='nav-btn-active' className='nav-btn' exact to='/'>Home</NavLink>
            <NavLink activeClassName='nav-btn-active' className='nav-btn' to='/add'>New Q</NavLink>
            <NavLink activeClassName='nav-btn-active' className='nav-btn' to='/leaderboard' >Leaderboard</NavLink>
        </nav>
    )
}

export default Nav