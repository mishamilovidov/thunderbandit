import React, { useContext } from 'react';
import DocumentMeta from 'react-document-meta';
import Section from '../../components/Section';
import styles from '../styles';
import { AppContext } from '../../contexts';
import { meta } from '../../services/analytics';

const Vidoes = () => {
  const {
    state: { theme }
  } = useContext(AppContext);
  const { ContentWrapper, Title, TitleText } = styles;

  return (
    <DocumentMeta {...meta.Videos}>
      <ContentWrapper theme={theme}>
        <Title theme={theme}>
          <TitleText theme={theme}>Videos</TitleText>
        </Title>
        <Section title='Music Videos' type='video' scene='videos' />
      </ContentWrapper>
    </DocumentMeta>
  );
};

export default Vidoes;
