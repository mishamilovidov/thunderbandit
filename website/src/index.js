import React, { useReducer } from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';
import { BrowserRouter, Route } from 'react-router-dom';
import { LastLocationProvider } from 'react-router-last-location';
import App from './scenes';
import GAListener from './components/GAListener';
import { AppContext } from './contexts';
import { AppInit, AppReducer, types } from './reducers';

const isNotLocal = window.location.hostname !== 'localhost';

if (isNotLocal) {
  ReactGA.initialize(process.env.REACT_APP_GA_TACKING_ID);
}

const Root = () => {
  const [state, dispatch] = useReducer(AppReducer, AppInit);

  console.log(state);

  return (
    <BrowserRouter>
      <LastLocationProvider>
        <AppContext.Provider value={{ state, dispatch }}>
          {isNotLocal ? (
            <GAListener>
              <Route path='/' component={App} />
            </GAListener>
          ) : (
            <Route path='/' component={App} />
          )}
        </AppContext.Provider>
      </LastLocationProvider>
    </BrowserRouter>
  );
};

ReactDOM.render(<Root />, document.getElementById('root'));
