import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Home from './components/Home';
import CheckList from './components/CheckList';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Account from './components/Account';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
    const authToken = localStorage.getItem('auth_token');
    const isAuthenticated = authToken ? true : false;

    return (
        <Router basename={process.env.PUBLIC_URL}>
            <Switch>
                <Route path="/" exact>
                    {isAuthenticated ? <Redirect to="/list" /> : <Home />} 
                </Route>
                <Route path="/login" exact component={Login} />
                <Route path="/signup" exact component={Signup} />
                <ProtectedRoute path ="/list" exact component={CheckList} />
                <ProtectedRoute path ="/account" exact component={Account} />
            </Switch>
        </Router>
    );
}

export default App;
