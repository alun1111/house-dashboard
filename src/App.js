import React, { Component } from 'react';
import './App.css';
import './mvp.css';
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
            <main>
              <section>
            <table>
              <tr>
                <td>
                  <RiverLevelPanel
                    stationId="14881-SG"
                    stationName="Whitburn"
                    recordMax={2.256} />
                </td>
                <td>
                  <RiverLevelPanel
                    stationId="14869-SG"
                    stationName="Almondell"
                    recordMax={2.27} />
                </td>
                <td>
                  <RiverLevelPanel
                    stationId="14867-SG"
                    stationName="Cragiehall"
                    recordMax={3.759} />
                </td>
              </tr>
              </table>
              </section>
              <section>
                <table>
                
              <tr>
                <td>
                  <RainfallPanel
                    stationId="14881"
                    stationName="Whitburn"
                  />
                </td>
                <td>
                  <RainfallPanel
                    stationId="15200"
                    stationName="Harperrig"
                  />
                </td>
                <td>
                  <RainfallPanel
                    stationId="15196"
                    stationName="Gogarbank"
                  />
                </td>
              </tr>
              </table>
              </section>
              <section>
                <table>
              <tr>
                <td>
                  <NumberDisplay measurementData={this.state.weatherStation} />
                </td>
              </tr>
            </table>
              </section>
            </main>
      );
    }
}

export default App;
