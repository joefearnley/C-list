import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home.js';
import CheckList from './components/CheckList.js';

function App() {
    return (
        <Router>
            <Switch>
                <Route path ="/" exact component = {Home} />
                <Route path ="/list" exact component = {CheckList} />
            </Switch>
        </Router>
    );
}

export default App;
