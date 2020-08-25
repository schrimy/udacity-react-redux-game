import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({path, component, loggedIn, ...rest}) => {
    return(
        <Route
            {...rest}
            render={() => {
                return loggedIn ? (
                    component
                ) : (
                    <Redirect to={{
                        pathname: '/login',
                        state: {from: path}
                    }} />
                )
            }}
        />
    )
}

export default PrivateRoute