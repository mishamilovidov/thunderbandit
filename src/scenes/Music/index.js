import React from 'react';
import DocumentMeta from 'react-document-meta';
import { meta } from '../../services/analytics';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { slideUpTransitionOptions } from '../../services/transitions';
import soundcloud from '../../services/soundcloud';
import Album from './components/Album';
import './styles.css';

const Music = () => {
  const albums = soundcloud.music.map((album) => {
    return (
      <Album
        key={album.name}
        album={album}
        />
    );
  });

  return (
    <DocumentMeta {...meta.Music}>
      <div className="Music">
        <div className="title">
          <ReactCSSTransitionGroup {...slideUpTransitionOptions}>
            <div className="text">Music</div>
            </ReactCSSTransitionGroup>
        </div>
        <div className="body">
          {albums}
        </div>
      </div>
    </DocumentMeta>
  );
};

export default Music;
