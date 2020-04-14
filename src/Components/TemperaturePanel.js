import React, { Component } from 'react';
import { XAxis, YAxis, LineChart, Line } from 'recharts';
import moment from 'moment'

class TemperaturePanel extends Component {
    constructor(props) {
      super(props);

      this.state = { 
          measurementData: 
          { 
            name: "No data", 
            current : { value: 0 },
            recent : [0,0,0]
          },
          stationId: props.stationId,
          stationName: props.stationName,
          temperatureType: props.temperatureType,
         };
    }

    componentDidMount(){
        fetch('http://192.168.1.100:5000/temperaturereadings/' + this.state.stationId + '/' + this.state.temperatureType)
        .then((res) => { 
         return res.json();
      })
        .then((data) => {
        this.setState({measurementData: data});
      })
    };

    formatXAxis(tickItem) {
    // If using moment.js
        return moment(tickItem).format('H')
    }

    render() {
        var current = this.state.measurementData.current;
        var recent = this.state.measurementData.recent; 

        return ( 
            <div>
            {
                    <div>
                        <div>
                            <div>{ this.state.stationName }</div>
                            <div>{ new Date(current.measurementTime).toLocaleString("en-GB") }</div>
                            <div>{ Number(current.value).toFixed(2) }</div>
                              </div>
                        <div>
                            <LineChart width={400} height={200} data={recent} >
                                <Line dataKey="value" fill="#03bafc" />
                                <YAxis dataKey="value" type="number" />
                                <XAxis dataKey="measurementTime" tickFormatter={this.formatXAxis} />
                            </LineChart>
                        </div>
                    </div>
            }
            </div>
        )
    };
};

export default TemperaturePanel