import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import HamburgerMenu from 'react-hamburger-menu';
import Navigation from '../Navigation';
import './styles.css';

class Header extends Component {
  constructor(props){
    super(props);

    this.state = {
      open: false,
      navigationOverlayDisplay: false
    }
  }

  handleClick() {
    this.setState({
      open: !this.state.open,
      navigationOverlayDisplay: !this.state.navigationOverlayDisplay
    });
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
            <Navigation />
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
            <Navigation />
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
