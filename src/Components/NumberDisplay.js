import React, { Component } from 'react';
import { Sparklines, SparklinesLine } from 'react-sparklines';
import '../Styles/NumberDisplay.css'

class NumberDisplay extends Component {

    constructor(props) {
      super(props);

      this.state = { measurementData: props.measurementData };
    }

    componentDidUpdate(nextProps) {
        if(this.props.measurementData !== nextProps.measurementData){
            this.setState({ measurementData: nextProps.measurementData });  
        }
    };

    render() { 
        return ( 
            <div>
            { 
                this.state.measurementData.map((m, i) => (
                    <div className="number-display-box" key={i}>
                        <div className="number-display-title-small">{ m.name }</div>
                        <div className="number-display-title-large">{ m.current.value }</div>

                        <Sparklines data={m.recent}>
                            <SparklinesLine />
                        </Sparklines>
                    </div>

                ))
            }
            </div>
        )
    };
};

export default NumberDisplay