import React from 'react';
import { Redirect } from 'react-router-dom';

class ProtectedRoute extends React.Component {

    render() {
        const Component = this.props.component;
        const isAuthenticated = localStorage.getItem('auth_token');
        const params = this.props.computedMatch.params;

        return isAuthenticated ? (
            <Component params={params}/>
        ) : (
            <Redirect to={{ pathname: '/' }} />
        );
    }
}

export default ProtectedRoute;