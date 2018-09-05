import React from 'react';
import ip from 'ip';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { LastLocationProvider } from 'react-router-last-location';
import ReactGA from 'react-ga';
import GAListener from './components/GAListener';
import App from './scenes';
import store from './store';

const isNotLocal = ip.address() !== "127.0.0.1";

if (isNotLocal) { ReactGA.initialize('UA-125276937-1') }

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <LastLocationProvider>
        {
          isNotLocal
          ?
          <GAListener>
            <Route exact path='/' component={App} />
          </GAListener>
          :
          <Route exact path='/' component={App} />
        }
      </LastLocationProvider>
    </BrowserRouter>
  </Provider>
  , document.getElementById('root'));
