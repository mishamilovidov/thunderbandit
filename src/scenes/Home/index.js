import React from 'react';
import ReactGA from 'react-ga';
import DocumentMeta from 'react-document-meta';
import { meta } from '../../services/analytics';
import { soundCloud144000 } from '../../services/soundcloud';
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
            <div className="subtitle">Setlist out now</div>
          </ReactCSSTransitionGroup>
          <ReactCSSTransitionGroup {...slideUpTransitionOptions}>
            <div className="title">144,000</div>
            <div className="callToAction">
              <ReactGA.OutboundLink
                eventLabel="soundCloud144000"
                to={soundCloud144000}>
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
