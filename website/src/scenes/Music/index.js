import React from 'react';
import DocumentMeta from 'react-document-meta';
import styled from 'styled-components';
import { meta } from '../../services/analytics';
import Section from './components/Section';
import './styles.css';

const MusicWrapper = styled.div`
  min-height: 100vh;
`;

const Music = () => {
  return (
    <DocumentMeta {...meta.Music}>
      <MusicWrapper className='Music'>
        <div className='title'>
          <div className='text'>Music</div>
        </div>
        <Section collections={['albums']} title='Albums' />
        <Section collections={['singles', 'eps']} title='Singles & EPs' />
        <Section collections={['setlists']} title='Setlists' />
      </MusicWrapper>
    </DocumentMeta>
  );
};

export default Music;
