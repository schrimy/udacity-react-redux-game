import React, { Component } from  'react'
import { connect } from 'react-redux'

class LeaderBoard extends Component {
    componentDidMount() {
        const { users } = this.props
    }

    render() {
        return(
            <div>
                LeaderBoard
            </div>
        )
    }
}

const mapStateToProps = ({ users }) => {
    return {
        users
    }
}

export default connect(mapStateToProps)(LeaderBoard)