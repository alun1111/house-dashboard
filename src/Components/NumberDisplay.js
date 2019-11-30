import React, { useState } from 'react';
import measurementData from '../data/measurements'
import { Sparklines, SparklinesLine } from 'react-sparklines';
import '../Styles/NumberDisplay.css'

const NumberDisplay = ( { title, origin } ) => {

    const measurement = useState(measurementData[origin].current);
    return ( 
        <div className="number-display-box">
            <div className="number-display-title-small">{ title }</div>
            <div className="number-display-title-large">{ measurement }</div>
            <Sparklines data={measurementData[origin].recent}>
                <SparklinesLine />
            </Sparklines>
        </div>
    );
};

export default NumberDisplay