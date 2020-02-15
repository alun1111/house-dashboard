import React, { Component } from 'react';
import './App.css';
import NumberDisplay from './Components/NumberDisplay.js'

class App extends Component {

    constructor(props) {
      super(props);

      this.state = { 
        riverLevels1:
          [{ 
            name: "No data", 
            current : { value: 0 },
            recent : [0,0,0]
          }],
        riverLevels2:
          [{ 
            name: "No data", 
            current : { value: 0 },
            recent : [0,0,0]
          }],
        riverLevels3:
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
        fetch('http://192.168.1.100:5000/riverlevelreadings/14869-SG'),
        fetch('http://192.168.1.100:5000/riverlevelreadings/14867-SG'),
        fetch('http://192.168.1.100:5000/riverlevelreadings/14881-SG'),
        fetch('http://192.168.1.100:5000/weatherstationreadings')
      ])
        .then(([res1, res2, res3, res4]) => { 
         return Promise.all([res1.json(), res2.json(), res3.json(), res4.json()]) 
      })
      .then(([data1, data2, data3, data4]) => {
        this.setState({riverLevels1: data1.readings})
        this.setState({riverLevels2: data2.readings})
        this.setState({riverLevels3: data3.readings})
        this.setState({weatherStation: data4.readings})
      })
    };

    render(){
      return (
        <div className="App">
          <header className="App-header">
              <NumberDisplay measurementData={ this.state.riverLevels1 } />
              <NumberDisplay measurementData={ this.state.riverLevels2 } />
              <NumberDisplay measurementData={ this.state.riverLevels3 } />
              <NumberDisplay measurementData={ this.state.weatherStation } />
          </header>
        </div>
      );
    }
}

export default App;
