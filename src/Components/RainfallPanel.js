import React, { Component } from 'react';
import InfoPanel from './InfoPanel.js'
import { XAxis, YAxis, BarChart, Bar, ResponsiveContainer } from 'recharts';
import moment from 'moment'
import configdata from '../config.json'

class RainfallPanel extends Component {
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
          startLoading: null,
          stopLoading: null
         };
    }

    componentDidMount(){
        this.setState({startLoading: moment()});
        fetch(configdata.SERVER_URL + '/rainfall/' + this.state.stationId)
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

        if(current !=null){

            return ( 
                <div>
                {
                    <section>
                        <header>
                            <h4>{ this.state.stationName } - { new Date(current.measurementTime).toLocaleString("en-GB") }</h4>
                            <h1>{ Number(current.value).toFixed(2) }</h1>
                            <ResponsiveContainer width = '95%' height = {250} >
                                <BarChart data={recent} >
                                    <Bar dataKey="value" fill="#03bafc" />
                                    <YAxis dataKey="value" type="number" />
                                    <XAxis dataKey="timeIndex" 
                                        scale="time" 
                                        type="number" 
                                        domain = {['auto', 'auto']}
                                        tickFormatter={this.formatXAxis} />
                                </BarChart>
                            </ResponsiveContainer>
                        </header>
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
        else{
            return(<p>Loading...</p>);
        }
    };
};

export default RainfallPanel