import React from 'react';
import Main from '../components/Main';
import Header from '../components/Header';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlay, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import WebFont from 'webfontloader';
import './styles.css';

library.add(faPlay);
library.add(faExternalLinkAlt);

WebFont.load({
  google: {
    families: ['Lato:300,400,700', 'sans-serif']
  }
});

const App = () => {
  return (
    <div className="App">
      <Header />
      <Main />
    </div>
  );
};

export default App;
