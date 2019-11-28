import React, { useState, useEffect } from 'react';
import measurementData from './data/measurements'

const Display = ( { title, origin } ) => {

    const measurement = useState(measurementData[origin].current);
    return ( 
        <div>
            <h2>{ title }</h2>
            <h2>{ measurement }</h2>
        </div>
    );
};

export default Display