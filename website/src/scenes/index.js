import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled, { createGlobalStyle } from 'styled-components';
import WebFont from 'webfontloader';
import { faPlay, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import Main from '../components/Main';
import Header from '../components/Header';
import { AppContext } from '../contexts';

library.add(faPlay);
library.add(faExternalLinkAlt);

WebFont.load({
  google: {
    families: ['Lato:300,400,700', 'sans-serif']
  }
});

const GlobalStyle = createGlobalStyle`
  html, body {
    max-width: 100%;
    overflow-x: hidden;
    margin: 0;
    padding: 0;
    background-color: #21181d;
  }

  a,
  a:link,
  a:visited,
  a:hover,
  a:active {
    color: inherit;
    text-decoration: inherit;
    font-weight: inherit;
  }

  .fade-slide-up-appear {
    opacity: 0.01;
    transform: translate(0px,20px);
  }

  .fade-slide-up-appear-active {
    opacity: 1;
    transform: translate(0px,0px);
    transition: .5s ease-in all;
  }

  .fade-appear {
    opacity: 0.01;
  }

  .fade-appear-active {
    opacity: 1;
    transition: .5s ease-in all;
  }
`;

const AppWrapper = styled.div`
  font-family: 'Lato', sans-serif;
  color: #2f3d4d;
  background-color: #21181d;
`;

const App = () => {
  const {
    state: { theme }
  } = useContext(AppContext);

  return (
    <AppWrapper theme={theme}>
      <GlobalStyle />
      <Header />
      <Main />
    </AppWrapper>
  );
};

AppWrapper.propTypes = {
  theme: PropTypes.objectOf(PropTypes.object).isRequired
};

export default App;
