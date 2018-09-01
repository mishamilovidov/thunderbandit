import React, { Component } from 'react';
import ReactPlayer from 'react-player'
import { mainVideoUrl } from '../../services/firebase';
import { soundCloudAccountUrl } from '../../services/soundcloud';
import albumArt from './album-art.png';
import './styles.css';

class Home extends Component {
  ref = player => {
    this.player = player
  }

  render() {
    return (
      <div className="Home">
        <div className="video">
          <a href={soundCloudAccountUrl}>
            <ReactPlayer
              ref={this.ref}
              playing
              onStart={() => this.player.seekTo(parseFloat(Math.random()))}
              url={mainVideoUrl}
              loop={true}
              controls={false}
              width='100%'
              height='100%'
              />
          </a>
        </div>
        <div className="albumArt">
          <img src={albumArt} alt="Thunder Bandit Album Art" />
          <img src={albumArt} alt="Thunder Bandit Album Art" />
          <img src={albumArt} alt="Thunder Bandit Album Art" />
          <img src={albumArt} alt="Thunder Bandit Album Art" />
        </div>
      </div>
    );
  }
}

export default Home;
