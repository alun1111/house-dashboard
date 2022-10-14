import React, { Component } from 'react';
import InfoPanel from './InfoPanel.js'
import configdata from '../config.json'
import { XAxis, YAxis, LineChart, Line, ResponsiveContainer, CartesianGrid } from 'recharts';
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
          startLoading: null,
          stopLoading: null
         };
    }

    componentDidMount(){
        this.setState({startLoading: moment()});

        var startDate = moment(moment().subtract(30, 'days') ).format("YYYY-MM-DD");

        fetch(configdata.SERVER_URL + '/temperature/' + this.state.stationId + '/' + this.state.temperatureType  + '?dateFrom=' + startDate,
            {
                headers: new Headers({
                    'authorisation': configdata.API_KEY
                })
            })
        .then((res) => { 
         return res.json();
      })
        .then((data) => {
        this.setState({measurementData: data});
        this.setState({stopLoading: moment()});
      })
    };

    formatXAxis(tickItem) {
        return moment.unix(tickItem).format('ddd Do')
    }

    render() {
        var current = this.state.measurementData.current;
        var recent = this.state.measurementData.recent;

        if(current !== 'undefined'){
            return ( 
                <div>
                {
                    <section>
                        <header>
                            <h4>{ this.state.stationName } - { new Date(current.measurementTime).toLocaleString("en-GB") }</h4>
                            <h2>{ Number(current.value).toFixed(2) }</h2>
                        </header>
                                <ResponsiveContainer width = '95%' height = {250} >
                                    <LineChart data={recent}>
                                        <Line dataKey="value" 
                                            fill="#03bafc" 
                                            dot={false} />
                                        <YAxis dataKey="value" type="number" />
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="timeIndex" 
                                            scale="time" 
                                            type="number" 
                                            domain = {['auto', 'auto']}
                                            tickFormatter={this.formatXAxis} />
                                    </LineChart>
                                </ResponsiveContainer>
                                <footer>
                                    <InfoPanel 
                                        startLoading={this.state.startLoading}
                                        stopLoading={this.state.stopLoading} />
                                </footer>
                    </section>
                }
                </div>
            )
        }
        else {
            return(<p>Loading...</p>)
        }
    };
};

export default TemperaturePanel