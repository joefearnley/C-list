import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Home from './components/Home';
import CheckList from './components/CheckList';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Account from './components/Account';
import ProtectedRoute from './components/ProtectedRoute';

function App() {

    const isAuthenticated = localStorage.getItem('auth_token');

    return (
        <Router basename={'/C-lister'}>
            <Switch>
                <Route path={`${process.env.PUBLIC_URL}/`}>
                    {isAuthenticated ? <Redirect path={`${process.env.PUBLIC_URL}/list`} /> : <Home />}
                </Route>
                <Route path={`${process.env.PUBLIC_URL}/login`} component={Login} />
                <Route path={`${process.env.PUBLIC_URL}/signup`} component={Signup} />
                <ProtectedRoute path={`${process.env.PUBLIC_URL}/list`} component={CheckList} />
                <ProtectedRoute path={`${process.env.PUBLIC_URL}/account`} component={Account} />
            </Switch>
        </Router>
    );
}

export default App;
