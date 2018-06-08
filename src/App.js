import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Thunderbandit's Site is Coming Soon!</h1>
        </header>
        <p className="App-intro">
          Thunderbandit's is <b>coming soon</b>. In the meantime, feel free to be enchanted by the ReactJS logo.
        </p>
      </div>
    );
  }
}

export default App;
