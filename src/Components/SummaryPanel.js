import React, { Component } from 'react';
import InfoPanel from './InfoPanel.js'
import moment from 'moment'
import configdata from '../config.json'

class SummaryPanel extends Component {
    constructor(props) {
      super(props);

      this.state = { 
          summary: 
          { 
            temperatureSummary: {
                highToday: 0,
                lowToday: 0
            },
            rainfallSummaries: []
          },
          startLoading: null,
          stopLoading: null
         };
    }

    componentDidMount(){
        this.setState({startLoading: moment()});
        fetch(configdata.SERVER_URL + '/summary/')
        .then((res) => { 
         return res.json();
      })
        .then((data) => {
        this.setState({summary: data});
        this.setState({stopLoading: moment()});
      })
    };

    render() {
        var highTemp = this.state.summary.temperatureSummary.highToday;
        var lowTemp = this.state.summary.temperatureSummary.lowToday;
        var latestMeasurement = this.state.summary.temperatureSummary.latest;
        var latestMeasurementTime = this.state.summary.temperatureSummary.latestMeasurementTime;
        var rainfallSummaries = this.state.summary.rainfallSummaries;
        var rainfallSummariesRow = rainfallSummaries.map(element => 
            <tr>
                <td>{ element.stationName }</td>
                <td>{ Number(element.rainToday).toFixed(1) } </td>
                <td>{ Number(element.lastThreeDays).toFixed(1) } </td>
            </tr>
        )

        return ( 
            <div>
            {
                <section>
                    <aside>
                    <table>
            <thead>
                <tr>
                    <td colspan="3">As of: {  new Date(latestMeasurementTime).toLocaleString("en-GB")  } </td>
                </tr>
                <tr>
                    <td>Latest</td>
                    <td>High Today</td>
                    <td>Low Today</td>
                </tr></thead>
                        <tbody>
                            <tr>
                                <td>{ Number(latestMeasurement).toFixed(1) }</td>
                                <td>{ Number(highTemp).toFixed(1) }</td>
                                <td>{ Number(lowTemp).toFixed(1) }</td>
                            </tr>
                        </tbody>
                        </table>
                    </aside>
                    <aside>
                        <table>
                        <thead>
                            <tr>
                                <td>Rainfall</td>
                                <td>Today</td>
                                <td>Last 3 days</td>
                            </tr>
                        </thead>
                        <tbody> { rainfallSummariesRow } </tbody>
                    </table>

                    </aside>
                    <footer>
                        <InfoPanel 
                            startLoading={this.state.startLoading}
                            stopLoading={this.state.stopLoading} />
                    </footer>
                </section>
            }
            </div>
        )
    };
};

export default SummaryPanel