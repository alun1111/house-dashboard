import React, { Component } from 'react';
import './App.css';
import NumberDisplay from './Components/NumberDisplay.js'

class App extends Component {

    componentDidUpdate(){
      fetch('http://192.168.1.100:5000/measurementpoint')
      .then(res => res.json())
      .then((data) => { 
        this.setState( { m: data.measurements });
        console.log(this.state.m);
        })
    };

    render(){
      return (
        <div className="App">
          <header className="App-header">
              <NumberDisplay measurements={ this.state.m } />
          </header>
        </div>
      );
    }
}

export default App;
