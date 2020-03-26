import React, { Component } from 'react';
import '../Styles/NumberDisplay.css'
import { XAxis, YAxis, BarChart } from 'recharts';

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
                                <YAxis dataKey="value" type="number" domain={[0, 100]} />/>
                                <XAxis dataKey="measurementTime" interval="preserveStartEnd" />
                            </BarChart>
                        </div>
                    </div>
            }
            </div>
        )
    };
};

export default RainfallPanel