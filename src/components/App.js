import React, { Component } from 'react'
import '../styles/app.css'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
/**
 * Components
 */
import Qlist from './Qlist'
import Nav from './Nav'
import UserInfo from './UserInfo'

class App extends Component {
  componentDidMount() {
    //get initial data
    this.props.dispatch(handleInitialData())
  }
  
  render() {
    return (
      <div className="App">
        <header className='header'>
          <Nav />
          <UserInfo />
        </header>
        <Qlist />
      </div>
    )
  }
}

//check that state has been set before trying to load images etc via seeing if authedUSer is set in async intial data action
const mapStateToProps = ({authedUser}) => {
  return {
    loggedIn: authedUser === null
  }
}

export default connect(mapStateToProps)(App)
