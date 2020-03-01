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
        var current = this.state.measurementData.current;
        var recent = this.state.measurementData.recent; 

        return ( 
            <div>
            {
                    <div className="number-display-box">
                        <div className="number-display-title-small">{ this.state.stationName }</div>
                        <div className="number-display-title-very-small">{ new Date(current.measurementTime).toLocaleString("en-GB") }</div>
                        <div className="number-display-title-large">{ Number(current.value).toFixed(2) }</div>
                            <LineChart
                            width={200}
                            height={200}
                            data={recent}
                            >
                            <YAxis dataKey="value" />
                            <XAxis dataKey="measurementTime"  />
                            <Line type="monotone" dataKey="value" stroke="#f5f5f5" yAxisId={0} />
                            </LineChart>
                    </div>
            }
            </div>
        )
    };
};

export default RiverLevelDisplay