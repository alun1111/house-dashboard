import React, { Component } from 'react';
import './App.css';
import NumberDisplay from './Components/NumberDisplay.js'

class App extends Component {

    constructor(props) {
      super(props);

      this.state = { measurementData:
        [{ 
          name: "No data", 
          current : { value: 0 },
          recent : [0,0,0]
        }] };
    }

    componentDidMount(){
      fetch('http://192.168.1.100:5000/measurementpoint')
      .then(res => res.json())
      .then((data) => { 
        this.setState( { measurementData: data.measurements });
        })
    };

    render(){
      return (
        <div className="App">
          <header className="App-header">
              <NumberDisplay measurementData={ this.state.measurementData } />
          </header>
        </div>
      );
    }
}

export default App;
