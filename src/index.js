import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { LastLocationProvider } from 'react-router-last-location';
import App from './scenes';
import store from './store';

ReactDOM.render(
  <Provider store={store}>
      <BrowserRouter>
        <LastLocationProvider>
          <Route exact path='/' component={App} />
        </LastLocationProvider>
      </BrowserRouter>
  </Provider>
  , document.getElementById('root'));
