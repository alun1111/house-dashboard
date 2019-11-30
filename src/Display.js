import React, { useState } from 'react';
import measurementData from './data/measurements'
import { Sparklines, SparklinesLine } from 'react-sparklines';

const Display = ( { title, origin } ) => {

    const measurement = useState(measurementData[origin].current);
    return ( 
        <div>
            <h2>{ title }</h2>
            <h2>{ measurement }</h2>
            <Sparklines data={measurementData[origin].recent}>
                <SparklinesLine />
            </Sparklines>
        </div>
    );
};

export default Display