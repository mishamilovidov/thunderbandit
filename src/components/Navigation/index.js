import React, { Component } from 'react';
import ReactGA from 'react-ga';
import { NavLink } from 'react-router-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { transitionOptions } from '../../services/transitions';
import { instagramAccountUrl } from '../../services/instagram';
import { soundCloudAccountUrl } from '../../services/soundcloud';
import './styles.css';

class Navigation extends Component {
  render() {
    return (
      <nav className="Navigation">
        <ReactCSSTransitionGroup {...transitionOptions}>
          <NavLink to="/">Home</NavLink>
          <ReactGA.OutboundLink
            eventLabel="soundCloudAccountUrl"
            to={soundCloudAccountUrl}>
            Music
          </ReactGA.OutboundLink>
          <ReactGA.OutboundLink
            eventLabel="instagramAccountUrl"
            to={instagramAccountUrl}>
            Instagram
          </ReactGA.OutboundLink>
        </ReactCSSTransitionGroup>
      </nav>
    );
  }
}

export default Navigation;
