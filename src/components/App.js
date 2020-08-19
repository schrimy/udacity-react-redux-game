import React, { Component, Fragment } from 'react'
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

class App extends Component {
  componentDidMount() {
    //get initial data
    document.title ='Would you rather'
    this.props.dispatch(handleInitialData())
  }
  
  //TODO: make sure main components are not mounting until init data is loaded
  render() {
    return (
        <div className="App">
          <LoadingBar />
          <header className='header'>
            <Nav />
            <UserInfo />
          </header>
          {this.props.loggedIn === true
            ? <Fragment>
                <Switch>
                  <Route path='/' exact component={Qlist} />
                  <Route path='/questions/:question_id' component={Qpage} />
                  <Route path='/add' component={NewQ} />
                  <Route path='/leaderboard' component={Leaderboard} />
                  <Route component={FourOfour}/>
                </Switch>
              </Fragment>
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
