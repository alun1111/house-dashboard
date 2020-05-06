import React, { Component } from 'react';
import { XAxis, YAxis, BarChart, Bar, ResponsiveContainer } from 'recharts';
import moment from 'moment'

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
         };
    }

    componentDidMount(){
        fetch('http://192.168.1.100:5000/rainfall/' + this.state.stationId)
        .then((res) => { 
         return res.json();
      })
        .then((data) => {
        this.setState({measurementData: data});
      })
    };

    formatXAxis(tickItem) {
        return moment.unix(tickItem).format('ddd Do')
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
                        <ResponsiveContainer width = '95%' height = {400} >
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
                </section>
            }
            </div>
        )
    };
};

export default RainfallPanel