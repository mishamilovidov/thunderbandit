import React, { Component } from 'react';
import Loader from 'react-loader-spinner'
import ReactPlayer from 'react-player'
import { soundCloudAccountUrl } from '../../services/soundcloud';
import albumArt from './album-art.png';
import './styles.css';

class Home extends Component {
  constructor(props){
    super(props);

    this.state = {
      loadingVideo: true,
    }
  }

  onVideoStart() {
    this.player.seekTo(parseFloat(Math.random()));
    this.setState({ loadingVideo: false });
  }

  ref = player => {
    this.player = player
  }

  render() {
    return (
      <div className="Home">
        <div className="video">
          <a href={soundCloudAccountUrl}>
            {
              this.state.loadingVideo
              ?
              <div className="loader">
                <Loader
                   type="Oval"
                   color="#ffffff"
                   height="50"
                   width="50"
                />
              </div>
              :
              ""
            }
            <ReactPlayer
              ref={this.ref}
              playing
              onStart={() => this.onVideoStart()}
              url={`/video.mp4`}
              loop={true}
              controls={false}
              width='100%'
              config={{
                youtube: {
                  playerVars: { showinfo: 0 }
                }
              }}
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
