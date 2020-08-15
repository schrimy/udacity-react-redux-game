import React, { Component } from 'react'
import '../App.css'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'

class App extends Component {
  componentDidMount() {
    //get initial data
    this.props.dispatch(handleInitialData())
  }

  render() {
    return (
      <div className="App">
        Hello World
      </div>
    )
  }
}

export default connect()(App)
