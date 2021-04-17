import _ from 'lodash';
import React, { useContext, useState } from 'react';
import ReactGA from 'react-ga';
import moment from 'moment-timezone';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
// import { AppContext } from '../../../../contexts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { transitionOptions } from '../../../../services/transitions';
import './styles.css';

const Album = ({ album }) => {
  // const { state: { firebase } } = useContext(AppContext);
  // const [imgUrl, setImgUrl] = useState(null)

  // useEffect(() => {
  //   '/thunderbandit/soundcloud/albumart'
  //   const get
  //   const recordingsStorageRef = storage.ref();
  //   const path = `home/fivenine/recordings/${date}/${callId}.mp3`;
  //   recordingsStorageRef
  //     .child(path)
  //     .getDownloadURL()
  //     .then(url 
  // }, [firebase])

  const songs = album.songs.map((song) => {
    return (
      <ReactGA.OutboundLink
        key={`${song.name}${song.playTime}`}
        eventLabel={`${_.camelCase(song.name)}Url`}
        to={song.link}>
        <div className="song">
          <div className="track-number">
            <span className="no-hover">{song.trackNumber}</span>
            <span className="hover">
              <FontAwesomeIcon icon="play" />
            </span>
          </div>
          <div className="track-name">
            {song.name}
          </div>
          <div className="track-playtime">
            <span className="no-hover">{song.playTime}</span>
            <span className="hover">
              <FontAwesomeIcon icon="external-link-alt" />
            </span>
          </div>
        </div>
      </ReactGA.OutboundLink>
    );
  });

  return (
    <ReactCSSTransitionGroup {...transitionOptions}>
      <div className="Album">
          <ReactGA.OutboundLink
            eventLabel={`${_.camelCase(album.name)}Url`}
            to={album.link}>
            {/* {imgUrl ? <span>imgUrl</span> : <span>placeholder</span>} */}
            {/* <img src={require(`../../../../services/soundcloud/albumart/${album.albumArt}`)} alt={album.name} /> */}
          </ReactGA.OutboundLink>
        <ReactGA.OutboundLink
          eventLabel={`${_.camelCase(album.name)}Url`}
          to={album.link}>
          <div className="album-title">
            {album.name}
          </div>
        </ReactGA.OutboundLink>
        <div className="release-date">
          {moment(album.releaseDate).format('MMM D, YYYY')}
        </div>
        <div className="songs">
          {songs}
        </div>
      </div>
    </ReactCSSTransitionGroup>
  );
};

export default Album;
