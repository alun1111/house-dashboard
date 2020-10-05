import React, { Component } from 'react';

class SummaryPanel extends Component {
    constructor(props) {
      super(props);

      this.state = { 
          summary: 
          { 
            temperatureSummary: {
                highToday: 0,
                lowToday: 0
            }
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

        return ( 
            <div>
            {
                <section>
                    <header>
                        <h4>High Today - { Number(highTemp).toFixed(1) }</h4>
                        <h4>Low Today - { Number(lowTemp).toFixed(1) }</h4>
                    </header>
                </section>
            }
            </div>
        )
    };
};

export default SummaryPanel