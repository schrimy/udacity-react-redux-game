import React, { Component } from 'react'
import '../styles/app.css'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import { Route, Switch } from 'react-router-dom'
import LoadingBar from 'react-redux-loading'
/**
 * Components
 */
import Qlist from './Qlist'
import Nav from './Nav'
import UserInfo from './UserInfo'
import Qpage from './Qpage'
import NewQ from './NewQ'
import Leaderboard from './Leaderboard'
import FourOfour from './FourOfour'
import Login from './Login'
import PrivateRoute from './PrivateRoute'

class App extends Component {
  componentDidMount() {
    //get initial data
    document.title ='Would you rather'
    //calls action creator from mapDispatchToProps
    this.props.handleInitialData()
  }
  
  render() {
    return (
        <div className='App'>
          <LoadingBar style={{ backgroundColor: '#ffae00' }} />
          <header className='header'>
            <Nav />
            <UserInfo />
          </header>
          <Switch>
            <PrivateRoute
              loggedIn={this.props.loggedIn}
              exact path='/'
              component={<Qlist />} />
            <PrivateRoute
              loggedIn={this.props.loggedIn}
              path='/questions/:question_id'
              component={<Qpage />} />
            <PrivateRoute
              loggedIn={this.props.loggedIn}
              path='/add'
              component={<NewQ />} />
            <PrivateRoute
              loggedIn={this.props.loggedIn}
              path='/leaderboard'
              component={<Leaderboard />} />
            <Route
              path='/login'
              component={Login} />
            <Route component={FourOfour} />
          </Switch>
        </div>
    )
  }
}

//use authedUser from state to know when to show components
const mapStateToProps = ({ authedUser }) => {
  return {
    loggedIn: authedUser !== null
  }
}

export default connect(mapStateToProps, { handleInitialData })(App)
