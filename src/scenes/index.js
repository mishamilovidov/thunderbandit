import React, { Component } from 'react';
import Main from '../components/Main';
import Header from '../components/Header';
// import Footer from '../components/Footer';
import WebFont from 'webfontloader';
import './styles.css';

WebFont.load({
  google: {
    families: ['Lato:300,400,700', 'sans-serif']
  }
});

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Main />
        {
          // <Footer />
        }
      </div>
    );
  }
}

export default App;
