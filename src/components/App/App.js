import React, { Component } from 'react';

import './App.css';
import Chart from '../Chart/Chart.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      hops: [],
    };
  }

  setHops = (newHopsArray) => {
    this.setState({
      hops: newHopsArray
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Hop Charts</h1>
        </header>
        <Chart setHops={this.setHops} />
      </div>
    );
  }
}

export default App;
