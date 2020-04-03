import React, { Component } from 'react';
import { Sparklines, SparklinesLine } from 'react-sparklines';

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
                    <div key={i}>
                        <div>{ m.name }</div>
                        <div>{ new Date(m.current.measurementTime).toLocaleString("en-GB") }</div>
                        <div>{ Number(m.current.value).toFixed(2) }</div>

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