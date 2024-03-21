import _ from 'lodash';
import ReactGA from 'react-ga';
import React, { useContext } from 'react';
import DocumentMeta from 'react-document-meta';
import styled, { createGlobalStyle } from 'styled-components';
import homeImgLg from './backcover-star-lg.png';
import homeImgSm from './backcover-star-sm.png';
import { AppContext } from '../../contexts';
import { meta } from '../../services/analytics';

const GlobalStyle = createGlobalStyle`
  body {
    background-image: url(${homeImgLg});
    background-repeat: no-repeat;
    background-position: 50% bottom;
    background-size: cover;
    position: relative;
    height: 100vh;
    
    @media only screen and (max-width: ${({ theme }) => theme.breakpoints.md}) {
      background-image: url(${homeImgSm});
    }
  }
`;

const HomeWrapper = styled.div``;

const HomeLayer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  margin-top: 60px;
`;

const HomeImg = styled.div`
  > img {
    width: 100%;
  }
`;

const HomeText = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  margin-top: 60px;
  text-align: right;
`;

const HomeTextTitle = styled.div`
  padding-right: 20px;
  font-size: 50px;
  max-width: 700px;
  margin: 0 auto;
  text-align: right;
  margin-top: 0px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
  text-transform: uppercase;
`;

const HomeTextSubtitle = styled.div`
  padding-right: 20px;
  max-width: 700px;
  margin: 0 auto;
  text-align: right;
  margin-top: 60px;
  font-size: 14px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
  text-transform: uppercase;
`;

const HomeTextAction = styled.div`
  text-align: right;
  padding-right: 20px;
  max-width: 700px;
  margin: 0 auto;
  margin-top: 15px;

  > a {
    border: 1px solid ${({ theme }) => theme.colors.text};
    background-color: #21181d;
    padding: 6px 12px;
    color: ${({ theme }) => theme.colors.text} !important;
    text-transform: uppercase;
  }

  > a:hover {
    background-color: ${({ theme }) => theme.colors.text};
    color: ${({ theme }) => theme.colors.secondary} !important;
    cursor: pointer;
  }
`;

const Home = () => {
  const {
    state: { theme }
  } = useContext(AppContext);

  return (
    <DocumentMeta {...meta.Home}>
      <GlobalStyle theme={theme} />
      <HomeWrapper>
        <HomeLayer />
        <HomeImg />
        <HomeText>
          <HomeTextSubtitle theme={theme}>EP out now</HomeTextSubtitle>
          <HomeTextTitle theme={theme}>Of</HomeTextTitle>
          <HomeTextAction theme={theme}>
            <ReactGA.OutboundLink
              eventLabel='soundCloud1'
              to='https://soundcloud.com/user-237574876/sets/of-1'
            >
              Listen on SoundCloud
            </ReactGA.OutboundLink>
          </HomeTextAction>
        </HomeText>
      </HomeWrapper>
    </DocumentMeta>
  );
};

export default Home;
