import React, { Component } from 'react'
import '../styles/app.css'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
/**
 * Components
 */
import Qlist from './Qlist'
import Nav from './Nav'

class App extends Component {
  componentDidMount() {
    //get initial data
    this.props.dispatch(handleInitialData())
  }

  render() {
    return (
      <div className="App">
        <Nav />
        <Qlist />
      </div>
    )
  }
}

export default connect()(App)
