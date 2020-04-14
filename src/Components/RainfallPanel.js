import React, { Component } from 'react';
import { XAxis, YAxis, BarChart, Bar } from 'recharts';
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
                            <BarChart width={400} height={200} data={recent} >
                                <Bar dataKey="value" fill="#03bafc" />
                                <YAxis dataKey="value" type="number" />
                                <XAxis dataKey="measurementTime" interval="preserveStartEnd" tickFormatter={this.formatXAxis} />
                            </BarChart>
                        </div>
                    </div>
            }
            </div>
        )
    };
};

export default RainfallPanel