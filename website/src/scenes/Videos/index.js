import React, { useContext } from 'react';
import DocumentMeta from 'react-document-meta';
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
      </ContentWrapper>
    </DocumentMeta>
  );
};

export default Vidoes;
