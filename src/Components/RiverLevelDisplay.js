import React, { Component } from 'react';
import '../Styles/NumberDisplay.css'
import MetricsGraphics from 'react-metrics-graphics';
import 'metrics-graphics/dist/metricsgraphics.css';


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
        return ( 
            <div>
            { 
                this.state.measurementData.map((m, i) => (
                    <div className="number-display-box" key={i}>
                        <div className="number-display-title-small">{ this.state.stationName }</div>
                        <div className="number-display-title-very-small">{ new Date(m.current.measurementTime).toLocaleString("en-GB") }</div>
                        <div className="number-display-title-large">{ Number(m.current.value).toFixed(2) }</div>

                        <MetricsGraphics
                            data={ 
                                [m.recent.map((m) => ({'date':new Date(m.measurementTime).toLocaleString("en-GB"),'value':m.value}))]
                            }
                        />
                    </div>

                ))
            }
            {

            }
            </div>
        )
    };
};

export default RiverLevelDisplay