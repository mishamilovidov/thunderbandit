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

  h1,
  h2,
  h3,
  h4,
  h5,
  p {
    color: ${({ theme }) => theme.colors.text};
  }

  a,
  a:link,
  a:visited,
  a:hover,
  a:active {
    color: ${({ theme }) => theme.colors.text};
    text-decoration: inherit;
    font-weight: inherit;
  }
`;

const AppWrapper = styled.div`
  font-family: ${({ theme }) => theme.fontFamily};
  background-color: ${({ theme }) => theme.colors.backgroundColor};
`;

const App = () => {
  const {
    state: { theme }
  } = useContext(AppContext);

  return (
    <AppWrapper
      theme={theme}
      onKeyUp={e => {
        if (e.key === 'Escape') {
          e.preventDefault();
          document.activeElement.blur();
        }
      }}
    >
      <GlobalStyle theme={theme} />
      <Header />
      <Main />
    </AppWrapper>
  );
};

AppWrapper.propTypes = {
  theme: PropTypes.objectOf(PropTypes.any).isRequired
};

GlobalStyle.propTypes = {
  theme: PropTypes.objectOf(PropTypes.any).isRequired
};

export default App;
