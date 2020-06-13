import React from 'react';
import './App.css';
import LoginModal from './components/LoginModal.js'
import SignupModal from './components/SignupModal.js'

function App() {
  return (
    <div className="App">
        <header className="App-header">
            <h1>CheckList</h1>
            <p>Check those things off the list.</p>
            <SignupModal />
            <LoginModal />
        </header>
    </div>
  );
}

export default App;
