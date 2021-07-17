import _ from 'lodash';
import ReactGA from 'react-ga';
import React from 'react';
import DocumentMeta from 'react-document-meta';
import homeImg from'./god-is-love.png';
import soundcloud from '../../services/soundcloud';
import styled from 'styled-components';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { meta } from '../../services/analytics';
import { 
  slideUpTransitionOptions,
  transitionOptions 
} from '../../services/transitions';

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
  background-image: url(${homeImg});
  background-repeat: no-repeat;
  background-position: 50% bottom;
  background-size: cover;
  position: relative;
  height: 100vh;

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
  color: #ffffff;
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
  color: #ffffff;
  text-transform: uppercase;
`;

const HomeTextAction = styled.div`
  text-align: right;
  padding-right: 20px;
  max-width: 700px;
  margin: 0 auto;
  margin-top: 15px;

  > a {
    border: 1px solid #ffffff;
    background-color: #21181D;
    padding: 6px 12px;
    color: #ffffff !important;
    text-transform: uppercase;
  }

  > a:hover {
    background-color: #ffffff;
    color: #FDC138 !important;
    cursor: pointer;
  }
`;

const Home = () => {
  return (
    <DocumentMeta {...meta.Home}>
      <HomeWrapper>
        <HomeLayer></HomeLayer>
        <ReactCSSTransitionGroup {...transitionOptions}>
          <HomeImg></HomeImg>
        </ReactCSSTransitionGroup>
        <HomeText>
          <ReactCSSTransitionGroup {...transitionOptions}>
            <HomeTextSubtitle>
              {soundcloud.home.songs.length > 1 ? 'EP' : 'Setlist'} out now
            </HomeTextSubtitle>
          </ReactCSSTransitionGroup>
          <ReactCSSTransitionGroup {...slideUpTransitionOptions}>
            <HomeTextTitle>{soundcloud.home.name}</HomeTextTitle>
            <HomeTextAction>
              <ReactGA.OutboundLink
                eventLabel={`soundCloud${_.camelCase(soundcloud.home.name)}`}
                to={soundcloud.home.link}>
                Listen on SoundCloud
              </ReactGA.OutboundLink>
            </HomeTextAction>
          </ReactCSSTransitionGroup>
        </HomeText>
      </HomeWrapper>
    </DocumentMeta>
  );
};

export default Home;
