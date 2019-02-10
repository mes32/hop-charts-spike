import axios from 'axios';
import React, { Component } from 'react';
import './App.css';

class App extends Component {

  componentDidMount() {
    axios({
      method: 'GET',
      url: '/hops',
    }).then((response) => {
      console.log(response.data);
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
      </div>
    );
  }
}

export default App;
