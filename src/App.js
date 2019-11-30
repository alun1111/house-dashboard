import React from 'react';
import './App.css';
import NumberDisplay from './Components/NumberDisplay.js'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <NumberDisplay title="River Level" origin="riverLevel"/>
        <NumberDisplay title="Outside Temperature" origin="temperature"/>
      </header>
    </div>
  );
}

export default App;
