import React, { Component } from 'react';
import './App.css';
import NumberDisplay from './Components/NumberDisplay.js'
import RiverLevelPanel from './Components/RiverLevelPanel.js'
import RainfallPanel from './Components/RainfallPanel.js'

class App extends Component {

    constructor(props) {
      super(props);

      this.state = { 
        weatherStation:
          [{ 
            name: "No data", 
            current : { value: 0 },
            recent : [0,0,0]
          }],
        
        };
    }

    componentDidMount(){
        fetch('http://192.168.1.100:5000/weatherstationreadings')
        .then((res) => { 
         return res.json();
      })
        .then((data) => {
        this.setState({weatherStation: data.readings})
      })
    };

    render(){
      return (
        <div className="App">
          <header className="App-header">
              <RiverLevelPanel 
                stationId="14881-SG"
                stationName="Whitburn"
                recordMax={2.256} />
              <RiverLevelPanel 
                stationId="14869-SG"
                stationName="Almondell" 
                recordMax={2.27} />
              <RiverLevelPanel 
                stationId="14867-SG"
                stationName="Cragiehall"
                recordMax={3.759}/>
              <RainfallPanel 
                stationId="14881"
                stationName="Whitburn"
                />
              <NumberDisplay measurementData={ this.state.weatherStation } />
          </header>
        </div>
      );
    }
}

export default App;
