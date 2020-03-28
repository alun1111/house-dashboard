import React, { Component } from 'react';
import '../Styles/NumberDisplay.css'
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
        return moment(tickItem).format('MMM Do')
    }

    render() {
        var current = this.state.measurementData.current;
        var recent = this.state.measurementData.recent; 

        return ( 
            <div className="number-display-box">
            {
                    <div className="container">
                        <div className="left-half">
                            <div className="number-display-title-small">{ this.state.stationName }</div>
                            <div className="number-display-title-very-small">{ new Date(current.measurementTime).toLocaleString("en-GB") }</div>
                            <div className="number-display-title-large">{ Number(current.value).toFixed(2) }</div>
                              </div>
                        <div className="right-half">
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