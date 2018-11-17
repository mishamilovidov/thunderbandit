import React, { Component } from 'react';
import ReactGA from 'react-ga';
import DocumentMeta from 'react-document-meta';
import { meta } from '../../services/analytics';
import { soundCloudAgraphia } from '../../services/soundcloud';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { transitionOptions, slideUpTransitionOptions } from '../../services/transitions';
import './styles.css';

class Home extends Component {
  render() {
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
              <div className="title">Agraphia</div>
              <div className="callToAction">
                <ReactGA.OutboundLink
                  eventLabel="soundCloudBaskets"
                  to={soundCloudAgraphia}>
                  Listen on SoundCloud
                </ReactGA.OutboundLink>
              </div>
            </ReactCSSTransitionGroup>
          </div>
        </div>
      </DocumentMeta>
    );
  }
}

export default Home;
