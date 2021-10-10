import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import HamburgerMenu from 'react-hamburger-menu';
import ReactGA from 'react-ga';
import styled from 'styled-components';
import { Link, NavLink } from 'react-router-dom';
import { AppContext } from '../../contexts';
import { instagramAccountUrl } from '../../services/instagram';
import { twitterAccountUrl } from '../../services/twitter';

const NavigationWrapper = styled.nav`
  .active {
    color: ${({ theme }) => theme.colors.secondary};
  }

  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: flex;
    flex-direction: column;

    > a {
      margin-bottom: 8px;
    }
  }
`;

const HeaderWrapper = styled.header`
  background-color: ${({ theme }) => theme.colors.backgroundColor};
  color: #ffffff;
  font-weight: bold;
  font-size: 18px;
  padding: 0 60px;
  min-height: 60px;
  position: relative;
  width: 1100px;
  margin: 0 auto;

  @media only screen and (max-width: 1300px) {
    width: 900px;
  }

  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.xl}) {
    width: 800px;
  }

  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: flex;
    align-items: center;
    width: unset;
    margin: unset;
    padding: unset;
  }
`;

const NavigationOverlay = styled.div`
  display: none;
  text-align: center;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.backgroundColor};
  transition: ${({ display }) =>
    display === 1 ? `0s ease-in all` : `0s ease-out all`};
  z-index: ${({ display }) => (display === 1 ? `1002` : `-1`)};
  opacity: ${({ display }) => (display === 1 ? `1` : `0`)};

  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: flex;
  }

  span {
    display: flex;
    flex-direction: column;

    a {
      margin-bottom: 15px;
      font-weight: normal;
    }

    a:last-child {
      margin-bottom: 0px;
    }
  }
`;

const Navigation = styled.div``;

const MobileTitle = styled.div`
  display: none;

  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: block;
    margin-left: 20px;
  }
`;

const NavigationContent = styled.div`
  display: flex;

  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

const NavigationContentTitle = styled.div`
  padding-top: 20px;
`;

const NavigationContentNav = styled.div`
  font-size: 16px;
  font-weight: 300;
  margin-left: auto;
  padding-top: 20px;

  a {
    margin-right: 20px;
  }

  a:last-child {
    margin-right: 0px;
  }

  a:hover {
    cursor: pointer;
    color: #8c8c8b;
  }
`;

const HamburgerWrapper = styled.div`
  display: none;
  position: absolute;
  z-index: 1003;
  border: 2px solid #ffffff;
  padding: 8px;

  :hover {
    cursor: pointer;
  }

  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: block;
    right: 20px;
    top: 14px;
  }
`;

const Header = () => {
  const {
    state: { theme }
  } = useContext(AppContext);
  const [open, setOpen] = useState(false);
  const [navOverlayDisplay, setNavOverlayDisplay] = useState(false);
  const handleClick = () => {
    setOpen(!open);
    setNavOverlayDisplay(!navOverlayDisplay);
  };
  const renderNav = () => (
    <NavigationWrapper theme={theme}>
      <NavLink exact to='/' onClick={handleClick}>
        Home
      </NavLink>
      <NavLink to='/music' onClick={handleClick}>
        Music
      </NavLink>
      <NavLink to='/videos' onClick={handleClick}>
        Videos
      </NavLink>
      <ReactGA.OutboundLink
        eventLabel='instagramAccountUrl'
        to={instagramAccountUrl}
        target='_blank'
      >
        Instagram
      </ReactGA.OutboundLink>
      <ReactGA.OutboundLink
        eventLabel='twitterAccountUrl'
        to={twitterAccountUrl}
        target='_blank'
      >
        Twitter
      </ReactGA.OutboundLink>
    </NavigationWrapper>
  );

  return (
    <HeaderWrapper theme={theme}>
      <NavigationOverlay theme={theme} display={Number(navOverlayDisplay)}>
        <Navigation>{renderNav()}</Navigation>
      </NavigationOverlay>
      <MobileTitle theme={theme}>
        <Link to='/'>THUNDER BANDIT</Link>
      </MobileTitle>
      <NavigationContent theme={theme}>
        <NavigationContentTitle>
          <Link to='/'>THUNDER BANDIT</Link>
        </NavigationContentTitle>
        <NavigationContentNav>{renderNav()}</NavigationContentNav>
      </NavigationContent>
      <HamburgerWrapper theme={theme}>
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
      </HamburgerWrapper>
    </HeaderWrapper>
  );
};

NavigationWrapper.propTypes = {
  theme: PropTypes.objectOf(PropTypes.any).isRequired
};

HeaderWrapper.propTypes = {
  theme: PropTypes.objectOf(PropTypes.any).isRequired
};

NavigationOverlay.propTypes = {
  display: PropTypes.number.isRequired,
  theme: PropTypes.objectOf(PropTypes.any).isRequired
};

MobileTitle.propTypes = {
  theme: PropTypes.objectOf(PropTypes.any).isRequired
};

NavigationContent.propTypes = {
  theme: PropTypes.objectOf(PropTypes.any).isRequired
};

HamburgerWrapper.propTypes = {
  theme: PropTypes.objectOf(PropTypes.any).isRequired
};

export default Header;
