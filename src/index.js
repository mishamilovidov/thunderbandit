import React, { useReducer } from 'react';
import ReactDOM from 'react-dom';
import App from './scenes';
import GAListener from './components/GAListener';
import ReactGA from 'react-ga';
import { AppInit, AppReducer, types } from './reducers';
import { BrowserRouter, Route } from 'react-router-dom';
import { LastLocationProvider } from 'react-router-last-location';

const isNotLocal = window.location.hostname !== 'localhost';

if (isNotLocal) { 
  ReactGA.initialize(process.env.REACT_APP_GA_TACKING_ID) 
}

const Root = () => {
  const [state, dispatch] = useReducer(AppReducer, AppInit);

  console.log(state.firebase)

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
