import React, { Component } from 'react';
import './App.css';
import NumberDisplay from './Components/NumberDisplay.js'

class App extends Component {

    constructor(props) {
      super(props);

      this.state = { riverLevels:
        [{ 
          name: "No data", 
          current : { value: 0 },
          recent : [0,0,0]
        }] };
    }

    componentDidMount(){
      fetch('http://192.168.1.100:5000/riverlevelreadings')
      .then(res => res.json())
      .then((data) => { 
        this.setState( { riverLevels: data.readings });
        })
    };

    render(){
      return (
        <div className="App">
          <header className="App-header">
              <NumberDisplay measurementData={ this.state.riverLevels } />
          </header>
        </div>
      );
    }
}

export default App;
