import axios from 'axios';
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

  componentDidMount() {
    axios({
      method: 'GET',
      url: '/hops',
    }).then((response) => {
      this.setState({
        hops: response.data,
      });
    }).catch((error) => {
      console.log(error);
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Hop Charts</h1>
        </header>
        <Chart hops={this.state.hops} />
      </div>
    );
  }
}

export default App;
