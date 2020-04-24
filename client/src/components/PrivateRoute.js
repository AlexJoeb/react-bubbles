import React from 'react'
import { Route, Redirect } from 'react-router-dom';

export default function PrivateRoute({ component: Component, user, ...rest }) {
    const token = localStorage.getItem('token') || null;
    return <Route {...rest} render={props => token ? (
        <Component {...props} />
    ) : (
        <Redirect to={{
            pathname: '/',
            state: { from: props.location }
        }} />
    )} />
}