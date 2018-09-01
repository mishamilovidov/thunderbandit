import React, { Component } from 'react';
import YouTubePlayer from 'react-player/lib/players/YouTube'
import { soundCloudAccountUrl } from '../../services/soundcloud';
import albumArt from './album-art.png';
import './styles.css';

class Home extends Component {
  constructor(props){
    super(props);

    this.state = {
      loadingVideo: true,
      overlayStyle: { display: "none" }
    }
  }

  onVideoStart() {
    // this.player.seekTo(parseFloat(Math.random()));
    this.setState({
      loadingVideo: false,
      overlayStyle: { display: "block" }
    });
  }

  ref = player => {
    this.player = player
  }

  render() {
    return (
      <div className="Home">
        <div className="video">
          <a href={soundCloudAccountUrl}>
            <div className="overlay" style={this.state.overlayStyle}></div>
          </a>
          <YouTubePlayer
            ref={this.ref}
            playing={true}
            onStart={() => this.onVideoStart()}
            url={`https://youtu.be/0UhxA5Uv-7w`}
            loop={true}
            controls={false}
            width='100%'
            config={{
              youtube: {
                playerVars: { showinfo: 0 }
              }
            }}
            />
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
