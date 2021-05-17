import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...props }) => {
    const isLoggeIn = useSelector(state => state.authReducer.isLoggedIn);

    return (
        <Route {...props} 
            render = {(props) => (
                isLoggeIn 
                    ? <Component {...props} />
                    : <Redirect to='/login' />
            )}    
        />
    )
}

export default ProtectedRoute;