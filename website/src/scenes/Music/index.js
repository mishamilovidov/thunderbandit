import React from 'react';
import DocumentMeta from 'react-document-meta';
import styled from 'styled-components';
import { meta } from '../../services/analytics';
import Albums from './components/Albums';
import './styles.css';

const MusicWrapper = styled.div`
  min-height: 100vh;
`;

const Music = () => {
  // const albums = soundcloud.music.map(album => {
  //   return <Album key={album.name} album={album} />;
  // });

  return (
    <DocumentMeta {...meta.Music}>
      <MusicWrapper className='Music'>
        <div className='title'>
          <div className='text'>Music</div>
        </div>
        <Albums />
      </MusicWrapper>
    </DocumentMeta>
  );
};

export default Music;
