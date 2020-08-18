import React, { Component, Fragment } from 'react'
import '../styles/app.css'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import { BrowserRouter, Route } from 'react-router-dom'
import LoadingBar from 'react-redux-loading'
/**
 * Components
 */
import Qlist from './Qlist'
import Nav from './Nav'
import UserInfo from './UserInfo'
import Qpage from './Qpage'
import NewQ from './NewQ'

class App extends Component {
  componentDidMount() {
    //get initial data
    this.props.dispatch(handleInitialData())
  }
  
  //TODO: make sure main components are not mounting until init data is loaded
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <LoadingBar />
          <header className='header'>
            <Nav />
            <UserInfo />
          </header>
          {this.props.loading === true
            ? <Fragment>
                <Route path='/' exact component={Qlist} />
                <Route path='/questions/:question_id' component={Qpage} />
                <Route path='/add' component={NewQ} />
              </Fragment>
            : null}
        </div>
      </BrowserRouter>
    )
  }
}

//check that state has been set before trying to load images etc via seeing if authedUSer is set in async intial data action
const mapStateToProps = ({authedUser}) => {
  return {
    loading: authedUser !== null
  }
}

export default connect(mapStateToProps)(App)
