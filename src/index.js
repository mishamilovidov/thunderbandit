import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { LastLocationProvider } from 'react-router-last-location';
import ReactGA from 'react-ga';
import GAListener from './components/GAListener';
import App from './scenes';

const isNotLocal = window.location.hostname !== 'localhost';

if (isNotLocal) { 
  ReactGA.initialize(process.env.REACT_APP_GA_TACKING_ID) 
}

const Root = () => {
  return (
    <BrowserRouter>
      <LastLocationProvider>
        {
          isNotLocal
            ? <GAListener>
                <Route path='/' component={App} />
              </GAListener>
            : <Route path='/' component={App} />
        }
      </LastLocationProvider>
    </BrowserRouter>
  );
};

ReactDOM.render(<Root />, document.getElementById('root'));
