import React, { Component } from 'react';
import '../Styles/NumberDisplay.css'
import { LineChart, Line, XAxis, YAxis, ReferenceLine,
  ReferenceDot, Tooltip, CartesianGrid, Legend, Brush, ErrorBar, AreaChart, Area,
  Label, LabelList } from 'recharts';

class RiverLevelDisplay extends Component {
    constructor(props) {
      super(props);

      this.state = { measurementData: props.measurementData, stationName: props.stationName };
    }

    componentDidUpdate(prevProps) {
        if(this.props.measurementData !== prevProps.measurementData){
            this.setState({ measurementData: this.props.measurementData });  
        }
    };

    render() {
        const current = this.state.measurementData 
            ? this.state.measurementData.current 
            : {measurementTime : 0, value: 0}; 

        const recent = this.state.measurementData 
            ? this.state.measurementData.recent
            : [{measurementTime : 0, value: 0}]; 
            
        console.log(current);
        console.log(recent);

        return ( 
            <div>
            {
                    <div className="number-display-box">
                        <div className="number-display-title-small">{ this.state.stationName }</div>
                        <div className="number-display-title-very-small">{ new Date(current.measurementTime).toLocaleString("en-GB") }</div>
                        <div className="number-display-title-large">{ Number(current.value).toFixed(2) }</div>
                        <LineChart width={600} height={400} data={recent}>
                            <Line dataKey="measurementTime" />
                        </LineChart>
                    </div>
            }
            </div>
        )
    };
};

export default RiverLevelDisplay