import React, { Component } from 'react';
import InfoPanel from './InfoPanel.js'
import { XAxis, YAxis, AreaChart, Area, ReferenceLine, ResponsiveContainer, CartesianGrid } from 'recharts';
import moment from 'moment'

class RiverLevelPanel extends Component {
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
          recordMax: props.recordMax,
          startLoading: null,
          stopLoading: null
         };
    }

    componentDidMount(){
        this.setState({startLoading: moment()});
        fetch('http://192.168.1.100:5000/riverlevel/' + this.state.stationId)
        .then((res) => { 
        return res.json();
      })
        .then((data) => {
        this.setState({measurementData: data});
        this.setState({stopLoading: moment()});
      })
    };

    getYMax(riverMax){
        return Math.round(riverMax*1.20, 2);
    }

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
                        <h1>{ Number(current.value).toFixed(2) }</h1>
                   </header> 
                        <ResponsiveContainer width = '95%' height = {250} >
                            <AreaChart data={recent} >
                                <YAxis dataKey="value" type="number" domain={[0, this.getYMax(this.state.recordMax)]} />
                                <XAxis dataKey="timeIndex" 
                                    scale="time" 
                                    type="number" 
                                    domain = {['auto', 'auto']}
                                    tickFormatter={this.formatXAxis} />
                                <CartesianGrid strokeDasharray="3 3" />
                                <Area type="monotone" dataKey="value" stroke="#f5f5f5" yAxisId={0} dot={false} />
                                <ReferenceLine y={this.state.recordMax} stroke="red" strokeDasharray="3 3" />
                            </AreaChart>
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
    };
};

export default RiverLevelPanel