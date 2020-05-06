import React, { Component } from 'react';
import './App.css';
import './mvp.css';
import TemperaturePanel from './Components/TemperaturePanel.js'
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
        <main>
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
                    recordMax={3.759} />
                  <RainfallPanel
                    stationId="14881"
                    stationName="Whitburn"
                  />
                  <RainfallPanel
                    stationId="15200"
                    stationName="Harperrig"
                  />
                  <RainfallPanel
                    stationId="15196"
                    stationName="Gogarbank"
                  />
                  <TemperaturePanel 
                    stationId="wmr-89" 
                    stationName="Outside Temp" 
                    temperatureType="outside" />
                  <TemperaturePanel 
                    stationId="wmr-89" 
                    stationName="Inside Temp" 
                    temperatureType="inside" />
        </main>
      );
    }
}

export default App;
