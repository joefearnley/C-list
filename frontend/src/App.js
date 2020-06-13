import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Home from './components/Home.js'
import CheckList from './components/CheckList.js'

function App() {
  return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <h1>CheckList</h1>
                    <p>Check those things off the list.</p>
                    <SignupModal />
                    <LoginModal />
                </header>
                <Switch>
                    <Route path="/list">
                        <CheckList />
                    </Route>
                </Switch>
            </div>
        </Router>
  );
}

export default App;
