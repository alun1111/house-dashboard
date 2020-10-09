import React, { Component } from 'react';
import moment from 'moment'

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
         };
    }

    componentDidMount(){
        fetch('http://192.168.1.100:5000/summary/')
        .then((res) => { 
         return res.json();
      })
        .then((data) => {
        this.setState({summary: data});
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
                </section>
            }
            </div>
        )
    };
};

export default SummaryPanel