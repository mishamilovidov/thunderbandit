import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { LastLocationProvider } from 'react-router-last-location';
import ReactGA from 'react-ga';
import GAListener from './components/GAListener';
import App from './scenes';
import store from './store';

const isNotLocal = window.location.hostname !== "localhost";

if (isNotLocal) { 
  ReactGA.initialize(process.env.REACT_APP_GA_TACKING_ID) 
}

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <LastLocationProvider>
        {
          isNotLocal
          ?
          <GAListener>
            <Route path='/' component={App} />
          </GAListener>
          :
          <Route path='/' component={App} />
        }
      </LastLocationProvider>
    </BrowserRouter>
  </Provider>
  , document.getElementById('root'));
