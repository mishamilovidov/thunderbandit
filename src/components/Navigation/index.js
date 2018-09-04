import React, { Component } from 'react';
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
          <a href={soundCloudAccountUrl}>Music</a>
          <a href={instagramAccountUrl}>Instagram</a>
        </ReactCSSTransitionGroup>
      </nav>
    );
  }
}

export default Navigation;
