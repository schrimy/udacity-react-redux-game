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
import Qpage from './Qpage'

class App extends Component {
  componentDidMount() {
    //get initial data
    this.props.dispatch(handleInitialData())
  }
  
  //TODO: make sure main components are not mounting until init data is loaded
  //TODO: use routing for Qpage id instead of props
  render() {
    return (
      <div className="App">
        <header className='header'>
          <Nav />
          <UserInfo />
        </header>
        {this.props.loggedIn === true
          ? <Qpage qId='vthrdm985a262al8qx3do'/>
          : null}
      </div>
    )
  }
}

//check that state has been set before trying to load images etc via seeing if authedUSer is set in async intial data action
const mapStateToProps = ({authedUser}) => {
  return {
    loggedIn: authedUser !== null
  }
}

export default connect(mapStateToProps)(App)
