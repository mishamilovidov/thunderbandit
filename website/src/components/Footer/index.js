import React, { Component } from 'react';
import soundCloudLogo from './soundcloud-logo.png';
import instagramLogo from './instagram-logo.png';
import './styles.css';

class Footer extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    const year = new Date().getFullYear();

    return (
      <footer className='Footer'>
        <div className='copyright'>&copy; {year} by Dmitri Milovidov</div>
        <div className='socialMedia'>
          <a href='https://soundcloud.com/user-544895508'>
            <img src={soundCloudLogo} alt='SoundCloud' />
          </a>
          <a href='https://www.instagram.com/thunderbandit/'>
            <img src={instagramLogo} alt='Instagram Logo' />
          </a>
        </div>
      </footer>
    );
  }
}

export default Footer;
