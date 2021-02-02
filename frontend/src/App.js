import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
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
        <Router basename={'/C-lister'}>
            <Route path='/'>
                {isAuthenticated ? <Redirect to='/list' /> : <Home />}
            </Route>
            <Route path='/login' component={Login} />
            <Route path='/signup' component={Signup} />
            <ProtectedRoute path='/list' component={CheckList} />
            <ProtectedRoute path='/account' component={Account} />

        </Router>
    );
}

export default App;
