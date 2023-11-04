import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Weather from './Components/Weather';
import ServiceStatus from './Components/ServiceStatus';

class App extends Component {
    render() {
        return (
            <Router>
                <Routes>
                    <Route path="/" element={<Weather />} />
                    <Route path="/service-status" element={<ServiceStatus />} />
                </Routes>
            </Router>
        );
    }
}

export default App;

