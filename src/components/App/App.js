import axios from 'axios';
import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: 6,
    };
  }

  componentDidMount() {
    axios({
      method: 'GET',
      url: '/hops',
    }).then((response) => {
      const newInt = response.data.count;
      this.setState({
        data: newInt,
      });
    }).catch((error) => {
      console.log(error);
    });
    console.log('test');
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Hop Charts</h1>
        </header>
        <p>{this.state.data}</p>
      </div>
    );
  }
}

export default App;
