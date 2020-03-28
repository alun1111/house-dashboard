import React, { Component } from 'react';
import '../Styles/NumberDisplay.css'
import { XAxis, YAxis, AreaChart, Area, ReferenceLine } from 'recharts';
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
         };
    }

    componentDidMount(){
        fetch('http://192.168.1.100:5000/riverlevelreadings/' + this.state.stationId)
        .then((res) => { 
         return res.json();
      })
        .then((data) => {
        this.setState({measurementData: data});
      })
    };

    getYMax(riverMax){
        return Math.round(riverMax*1.20, 2);
    }

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
                            <AreaChart width={400} height={200} data={recent} >
                                <YAxis dataKey="value" type="number" domain={[0, this.getYMax(this.state.recordMax)]} />/>
                                <XAxis dataKey="measurementTime" interval="preserveStartEnd" tickFormatter={this.formatXAxis} />
                                <Area type="monotone" dataKey="value" stroke="#f5f5f5" yAxisId={0} dot={false} />
                                <ReferenceLine y={this.state.recordMax} stroke="red" strokeDasharray="3 3" />
                            </AreaChart>
                        </div>
                    </div>
            }
            </div>
        )
    };
};

export default RiverLevelPanel