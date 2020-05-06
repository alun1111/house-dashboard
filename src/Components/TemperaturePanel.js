import React, { Component } from 'react';
import { XAxis, YAxis, LineChart, Line, ResponsiveContainer } from 'recharts';
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
        return moment.unix(tickItem).format('HH:mm')
    }

    render() {
        var current = this.state.measurementData.current;
        var recent = this.state.measurementData.recent;

        return ( 
            <div>
            {
                <section>
                    <header>
                        <h4>{ this.state.stationName } - { new Date(current.measurementTime).toLocaleString("en-GB") }</h4>
                        <h2>{ Number(current.value).toFixed(2) }</h2>
                    </header>
                            <ResponsiveContainer width = '95%' height = {400} >
                                <LineChart data={recent}>
                                    <Line dataKey="value" 
                                        fill="#03bafc" 
                                        dot={false} />
                                    <YAxis dataKey="value" type="number" />
                                    <XAxis dataKey="timeIndex" 
                                        scale="time" 
                                        type="number" 
                                        domain = {['auto', 'auto']}
                                        tickFormatter={this.formatXAxis} />
                                </LineChart>
                            </ResponsiveContainer>
                </section>
            }
            </div>
        )
    };
};

export default TemperaturePanel