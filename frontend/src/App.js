import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import CheckList from './components/CheckList';
import Login from './components/auth/Login';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
    return (
        <Router>
            <Switch>
                <Route path ="/" exact component = {Home} />
                <Route path ="/login" exact component = {Login} />
                <ProtectedRoute path ="/list" exact component = {CheckList} />
            </Switch>
        </Router>
    );
}

export default App;
