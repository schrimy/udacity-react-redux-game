import React from 'react'
import { Route, Redirect } from 'react-router-dom'

/**
 * returns route to be used by main App child components, determining whether to show if user logged in or not
 * ref: https://reactrouter.com/web/example/auth-workflow,
 * https://codedaily.io/tutorials/49/Create-a-ProtectedRoute-for-Logged-In-Users-with-Route-Redirect-and-a-Render-Prop-in-React-Router
 */

//checks if loggedin, if not redirect to login, if true render relevant component and have correct URL
const PrivateRoute = ({ path, component, loggedIn, ...rest }) => {
    return(
        <Route
            { ...rest }
            render={() => {
                return loggedIn ? (
                    component
                ) : (
                    <Redirect to={{
                        pathname: '/login',
                        state: { from: path }
                    }} />
                )
            }}
        />
    )
}

export default PrivateRoute