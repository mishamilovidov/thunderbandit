import React, { useContext } from 'react';
import DocumentMeta from 'react-document-meta';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { AppContext } from '../../contexts';
import { meta } from '../../services/analytics';
import Section from './components/Section';
import './styles.css';

const MusicWrapper = styled.div`
  min-height: 100vh;
  padding-bottom: 200px;

  a {
    :focus,
    :hover,
    :active {
      text-decoration: underline;
      color: ${({ theme }) => theme.colors.secondary};

      > p {
        color: ${({ theme }) => theme.colors.secondary};
      }
    }
  }
`;

const Music = () => {
  const {
    state: { theme }
  } = useContext(AppContext);

  return (
    <DocumentMeta {...meta.Music}>
      <MusicWrapper className='Music' theme={theme}>
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

MusicWrapper.propTypes = {
  theme: PropTypes.objectOf(PropTypes.any).isRequired
};

export default Music;
