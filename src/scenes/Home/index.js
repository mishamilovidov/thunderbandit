import _ from 'lodash';
import ReactGA from 'react-ga';
import React from 'react';
import DocumentMeta from 'react-document-meta';
import { meta } from '../../services/analytics';
import soundcloud from '../../services/soundcloud';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { transitionOptions, slideUpTransitionOptions } from '../../services/transitions';
import './styles.css';

const Home = () => {
  return (
    <DocumentMeta {...meta.Home}>
      <div className="Home">
        <div className="layer"></div>
        <ReactCSSTransitionGroup {...transitionOptions}>
          <div className="image"></div>
        </ReactCSSTransitionGroup>
        <div className="text">
          <ReactCSSTransitionGroup {...transitionOptions}>
            <div className="subtitle">
              {soundcloud.home.songs.length > 1 ? 'EP' : 'Setlist'} out now
            </div>
          </ReactCSSTransitionGroup>
          <ReactCSSTransitionGroup {...slideUpTransitionOptions}>
            <div className="title">{soundcloud.home.name}</div>
            <div className="callToAction">
              <ReactGA.OutboundLink
                eventLabel={`soundCloud${_.camelCase(soundcloud.home.name)}`}
                to={soundcloud.home.link}>
                Listen on SoundCloud
              </ReactGA.OutboundLink>
            </div>
          </ReactCSSTransitionGroup>
        </div>
      </div>
    </DocumentMeta>
  );
};

export default Home;
