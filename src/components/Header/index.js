import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import HamburgerMenu from 'react-hamburger-menu';
import ReactGA from 'react-ga';
import { NavLink } from 'react-router-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { transitionOptions } from '../../services/transitions';
import { instagramAccountUrl } from '../../services/instagram';
import { twitterAccountUrl } from '../../services/twitter';
import './styles.css';

class Header extends Component {
  state = {
    open: false,
    navigationOverlayDisplay: false
  };

  handleClick() {
    this.setState({
      open: !this.state.open,
      navigationOverlayDisplay: !this.state.navigationOverlayDisplay
    });
  }

  renderNav() {
    return (
      <nav className="Navigation">
        <ReactCSSTransitionGroup {...transitionOptions}>
          <NavLink exact
            to="/"
            onClick={this.handleClick.bind(this)}
            >
            Home
          </NavLink>
          <NavLink
            to="/music"
            onClick={this.handleClick.bind(this)}
            >
            Music
          </NavLink>
          <ReactGA.OutboundLink
            eventLabel="instagramAccountUrl"
            to={instagramAccountUrl}>
            Instagram
          </ReactGA.OutboundLink>
          <ReactGA.OutboundLink
            eventLabel="twitterAccountUrl"
            to={twitterAccountUrl}>
            Twitter
          </ReactGA.OutboundLink>
        </ReactCSSTransitionGroup>
      </nav>
    );
  }

  render() {
    return (
      <header className="Header">
        <div
          className={
            this.state.navigationOverlayDisplay
            ?
            `navigationOverlay navigationOverlay-active`
            :
            `navigationOverlay`
          }
          >
          <div className="navigation">
            {this.renderNav()}
          </div>
        </div>
        <div className="mobile-title">
          <Link to="/">
            THUNDER BANDIT
          </Link>
        </div>
        <div className="content">
          <div className="title">
            <Link to="/">
              THUNDER BANDIT
            </Link>
          </div>
          <div className="navigation">
            {this.renderNav()}
          </div>
        </div>
        <div className="hamburger">
          <HamburgerMenu
            isOpen={this.state.open}
            menuClicked={this.handleClick.bind(this)}
            width={18}
            height={15}
            strokeWidth={1}
            rotate={0}
            color='#ffffff'
            borderRadius={0}
            animationDuration={0.5}
          />
        </div>
      </header>
    );
  }
}

export default Header;
