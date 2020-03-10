import React, { Component } from 'react';
import './App.css';
import NumberDisplay from './Components/NumberDisplay.js'
import RiverLevelPanel from './Components/RiverLevelPanel.js'

class App extends Component {

    constructor(props) {
      super(props);

      this.state = { 
        almondell_level:
          { 
            name: "No data", 
            current : { value: 0 },
            recent : [0,0,0]
          },
        whitburn_level:
          { 
            name: "No data", 
            current : { value: 0 },
            recent : [0,0,0]
          },
        cragiehall_level:
          { 
            name: "No data", 
            current : { value: 0 },
            recent : [0,0,0]
          },
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
        this.setState({almondell_level: data1})
        this.setState({cragiehall_level: data2})
        this.setState({whitburn_level: data3})
        this.setState({weatherStation: data4.readings})
      })
    };

    render(){
      return (
        <div className="App">
          <header className="App-header">
              <RiverLevelPanel 
                measurementData={ this.state.whitburn_level } 
                stationName="Whitburn"
                recordMax={2.256} />
              <RiverLevelPanel 
                measurementData={ this.state.almondell_level } 
                stationName="Almondell" 
                recordMax={2.27} />
              <RiverLevelPanel 
                measurementData={ this.state.cragiehall_level } 
                stationName="Cragiehall"
                recordMax={3.759}/>
              <NumberDisplay measurementData={ this.state.weatherStation } />
          </header>
        </div>
      );
    }
}

export default App;
