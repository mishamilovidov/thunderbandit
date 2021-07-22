import React from 'react';
import DocumentMeta from 'react-document-meta';
import styled from 'styled-components';
import { meta } from '../../services/analytics';
import Section from './components/Section';
import './styles.css';

const MusicWrapper = styled.div`
  min-height: 100vh;
  padding-bottom: 200px;
`;

const Music = () => {
  return (
    <DocumentMeta {...meta.Music}>
      <MusicWrapper className='Music'>
        <div className='title'>
          <div className='text'>Music</div>
        </div>
        <Section title='Albums' type='album' />
        <Section title='EPs' type='ep' />
        <Section title='Singles' type='single' />
        <Section title='Setlists' type='setlist' />
      </MusicWrapper>
    </DocumentMeta>
  );
};

export default Music;
