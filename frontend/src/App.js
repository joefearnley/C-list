import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
        <header className="App-header">
            <h1>CheckList</h1>  
            <p>Check those things off the list.</p>
            <p><a href="/signup" className="sign-up">Sign up</a></p> 
            <p className="aleady-a-user">Already a user? <a href="/signin" className="sign-in">Sign in</a></p>
        </header>
    </div>
  );
}

export default App;
