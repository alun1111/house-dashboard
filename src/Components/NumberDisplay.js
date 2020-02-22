import React, { Component } from 'react';
import { Sparklines, SparklinesLine } from 'react-sparklines';
import '../Styles/NumberDisplay.css'

class NumberDisplay extends Component {

    constructor(props) {
      super(props);

      this.state = { measurementData: props.measurementData };
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
                        <div className="number-display-title-small">{ m.name }</div>
                        <div className="number-display-title-very-small">{ new Date(m.current.measurementTime).toLocaleString("en-GB") }</div>
                        <div className="number-display-title-large">{ Number(m.current.value).toFixed(2) }</div>

                        <Sparklines data={ m.recent.map((m) => (m.value)) } >
                            <SparklinesLine/>
                        </Sparklines>
                    </div>

                ))
            }
            </div>
        )
    };
};

export default NumberDisplay