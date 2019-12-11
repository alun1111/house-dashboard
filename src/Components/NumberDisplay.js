import React from 'react';
import { Sparklines, SparklinesLine } from 'react-sparklines';
import '../Styles/NumberDisplay.css'

const NumberDisplay = ( { measurements } ) => {

    return ( 
        <div>
        { 
            measurements.map((m) => (
                <div className="number-display-box">
                    <div className="number-display-title-small">{ m.name }</div>
                    <div className="number-display-title-large">{ m.current.value }</div>

                    <Sparklines data={m.recent}>
                        <SparklinesLine />
                    </Sparklines>
                </div>

            ))
        }
        </div>
    );
};

export default NumberDisplay