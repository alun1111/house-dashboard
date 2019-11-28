import React from 'react';
import logo from './logo.svg';
import './App.css';
import Display from './Display.js'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Display title="River Level" origin="riverLevel"/>
        <Display title="Outside Temperature" origin="temperature"/>
      </header>
    </div>
  );
}

export default App;
