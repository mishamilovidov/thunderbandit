import _ from 'lodash';
import React from 'react';
import ReactGA from 'react-ga';
import moment from 'moment-timezone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { transitionOptions } from '../../../../services/transitions';
import './styles.css';

const Album = ({ album }) => {
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
