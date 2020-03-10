import React, { Component } from 'react';
import '../Styles/NumberDisplay.css'
import { XAxis, YAxis, AreaChart, Area } from 'recharts';

class RiverLevelPanel extends Component {
    constructor(props) {
      super(props);

      this.state = { 
          measurementData: props.measurementData, 
          stationName: props.stationName,
          recordMax: props.recordMax,
         };
    }

    componentDidUpdate(prevProps) {
        if(this.props.measurementData !== prevProps.measurementData){
            this.setState({ measurementData: this.props.measurementData });  
        }
    };

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
                                <YAxis dataKey="value" />
                                <XAxis dataKey="measurementTime" interval="preserveStartEnd" />
                                <Area type="monotone" dataKey="value" stroke="#f5f5f5" yAxisId={0} dot={false} />
                            </AreaChart>
                        </div>
                    </div>
            }
            </div>
        )
    };
};

export default RiverLevelPanel