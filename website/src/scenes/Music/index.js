import React, { useContext } from 'react';
import DocumentMeta from 'react-document-meta';
import styles from '../styles';
import { AppContext } from '../../contexts';
import { meta } from '../../services/analytics';
import Section from './components/Section';

const Music = () => {
  const {
    state: { theme }
  } = useContext(AppContext);
  const { ContentWrapper, Title, TitleText } = styles;

  return (
    <DocumentMeta {...meta.Music}>
      <ContentWrapper theme={theme}>
        <Title theme={theme}>
          <TitleText theme={theme}>Music</TitleText>
        </Title>
        <Section title='Albums' type='album' />
        <Section title='Videos' type='video' />
        <Section title='EPs' type='ep' />
        <Section title='Singles' type='single' />
        <Section title='Setlists' type='setlist' />
      </ContentWrapper>
    </DocumentMeta>
  );
};

export default Music;
