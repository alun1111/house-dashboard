import React, { Component } from 'react';
import './App.css';
import NumberDisplay from './Components/NumberDisplay.js'

class App extends Component {

    constructor(props) {
      super(props);

      this.state = { 
        riverLevels:
          [{ 
            name: "No data", 
            current : { value: 0 },
            recent : [0,0,0]
          }],
        weatherStation:
          [{ 
            name: "No data", 
            current : { value: 0 },
            recent : [0,0,0]
          }],
        
        };
    }

    componentDidMount(){
      Promise.all([
        fetch('http://192.168.1.100:5000/riverlevelreadings'),
        fetch('http://192.168.1.100:5000/weatherstationreadings')
      ])
        .then(([res1, res2]) => { 
         return Promise.all([res1.json(), res2.json()]) 
      })
      .then(([data1, data2]) => {
        this.setState({riverLevels: data1.readings})
        this.setState({weatherStation: data2.readings})
      })
    };

    render(){
      return (
        <div className="App">
          <header className="App-header">
              <NumberDisplay measurementData={ this.state.riverLevels } />
              <NumberDisplay measurementData={ this.state.weatherStation } />
          </header>
        </div>
      );
    }
}

export default App;
