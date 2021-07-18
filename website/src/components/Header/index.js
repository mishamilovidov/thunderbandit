import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import HamburgerMenu from 'react-hamburger-menu';
import ReactGA from 'react-ga';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { transitionOptions } from '../../services/transitions';
import { instagramAccountUrl } from '../../services/instagram';
import { twitterAccountUrl } from '../../services/twitter';
import './styles.css';

const Header = () => {
  const [open, setOpen] = useState(false);
  const [navOverlayDisplay, setNavOverlayDisplay] = useState(false);
  const handleClick = () => {
    setOpen(!open);
    setNavOverlayDisplay(!navOverlayDisplay);
  };
  const renderNav = () => (
    <nav className='Navigation'>
      <ReactCSSTransitionGroup {...transitionOptions}>
        <NavLink exact to='/' onClick={handleClick}>
          Home
        </NavLink>
        <NavLink to='/music' onClick={handleClick}>
          Music
        </NavLink>
        <ReactGA.OutboundLink
          eventLabel='instagramAccountUrl'
          to={instagramAccountUrl}
        >
          Instagram
        </ReactGA.OutboundLink>
        <ReactGA.OutboundLink
          eventLabel='twitterAccountUrl'
          to={twitterAccountUrl}
        >
          Twitter
        </ReactGA.OutboundLink>
      </ReactCSSTransitionGroup>
    </nav>
  );

  return (
    <header className='Header'>
      <div
        className={
          navOverlayDisplay
            ? `navigationOverlay navigationOverlay-active`
            : `navigationOverlay`
        }
      >
        <div className='navigation'>{renderNav()}</div>
      </div>
      <div className='mobile-title'>
        <Link to='/'>THUNDER BANDIT</Link>
      </div>
      <div className='content'>
        <div className='title'>
          <Link to='/'>THUNDER BANDIT</Link>
        </div>
        <div className='navigation'>{renderNav()}</div>
      </div>
      <div className='hamburger'>
        <HamburgerMenu
          isOpen={open}
          menuClicked={handleClick}
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
};

export default Header;
