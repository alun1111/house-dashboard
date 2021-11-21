import React, { Component } from 'react';
import './App.css';
import './mvp.css';
import TemperaturePanel from './Components/TemperaturePanel.js'
import RiverLevelPanel from './Components/RiverLevelPanel.js'
import RainfallPanel from './Components/RainfallPanel.js'
import SummaryPanel from './Components/SummaryPanel';

class App extends Component {

    render(){
      return (
        <main>
                  <SummaryPanel />
                  <RiverLevelPanel
                    stationId="14881"
                    stationName="Whitburn"
                    recordMax={2.256} />
                  <RiverLevelPanel
                    stationId="14869"
                    stationName="Almondell"
                    recordMax={2.27} />
                  <RiverLevelPanel
                    stationId="14867"
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
