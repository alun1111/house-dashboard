import React from 'react';
import logo from './logo.svg';
import './App.css';

class NumberDisplay extends React.Component {
  constructor(props) {
    super(props)
    this.state = { number: getNumber() }
  }

  getNumber(){
    return Date.now;
  }

  render () {
    return <div className='display'>
      <p>{this.props.title}</p>
      <p>{this.props.number}</p>
    </div>
 }
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <NumberDisplay title="Temperature" />
        <NumberDisplay title="River Level" />
      </header>
    </div>
  );
}

export default App;
