import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TemperaturePanel from './TemperaturePanel.js';
import RiverLevelPanel from './RiverLevelPanel.js';
import RainfallPanel from './RainfallPanel.js';
import SummaryPanel from './SummaryPanel.js';

class Weather extends Component {
    render() {
        return (
            <main>
                <SummaryPanel />
                <RiverLevelPanel
                    stationId="14881"
                    stationName="Whitburn"
                    recordMax={2.256} />
                <RiverLevelPanel
                    stationId="14869"
                    stationName="Almondell"
                    recordMax={2.27} />
                <RiverLevelPanel
                    stationId="14867"
                    stationName="Cragiehall"
                    recordMax={3.759} />
                <RainfallPanel
                    stationId="14881"
                    stationName="Whitburn"
                />
                <RainfallPanel
                    stationId="15200"
                    stationName="Harperrig"
                />
                <RainfallPanel
                    stationId="15196"
                    stationName="Gogarbank"
                />
                <TemperaturePanel
                    stationId="wmr-89"
                    stationName="Outside Temp"
                    temperatureType="outside" />
                <TemperaturePanel
                    stationId="wmr-89"
                    stationName="Inside Temp"
                    temperatureType="inside" />
                <Link to="/service-status">Check Service Status</Link>
            </main>
        );
    }
}

export default Weather;
