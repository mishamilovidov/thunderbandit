import _ from 'lodash';
import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { AppContext } from '../../../../../../contexts';

const Item = styled.div`
  margin-right: 24px;
`;

const CoverArt = styled.div`
  background-image: url(${({ img }) => img});
  background-size: cover;
  background-repeat: no-repeat;
  height: ${({ theme }) => theme.scenes.music.coverart.height};
  min-width: ${({ theme }) => theme.scenes.music.coverart.width};
  background-color: ${({ theme }) =>
    theme.scenes.music.coverart.placeholderColor};
  animation: ${({ loading }) =>
    loading === 1 ? `pulse 1s infinite ease-in-out` : 'unset'};
  border-radius: 6px;

  @keyframes pulse {
    0% {
      background-color: rgba(165, 165, 165, 0.1);
    }
    50% {
      background-color: rgba(165, 165, 165, 0.3);
    }
    100% {
      background-color: rgba(165, 165, 165, 0.1);
    }
  }
`;

const SectionItem = ({ item }) => {
  const {
    state: { firebase, theme }
  } = useContext(AppContext);
  const [imgUrl, setImgUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const { data } = item;
  useEffect(() => {
    const getUrl = async () => {
      try {
        const url = await firebase.storage
          .ref('images/coverart')
          .child(`${data.slug}_150x150.png`)
          .getDownloadURL();
        setImgUrl(url);
        return setLoading(false);
      } catch (err) {
        console.error(err);
        return setLoading(false);
      }
    };
    if (data) getUrl();
  }, [firebase, data]);

  return (
    <Item>
      <CoverArt
        theme={theme}
        img={imgUrl}
        title={_.get(data, 'name', '')}
        loading={Number(loading)}
      />
    </Item>
  );
};

SectionItem.propTypes = {
  item: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.objectOf(PropTypes.any)
  ]).isRequired
};

CoverArt.propTypes = {
  theme: PropTypes.objectOf(PropTypes.any).isRequired,
  img: PropTypes.string,
  title: PropTypes.string.isRequired,
  loading: PropTypes.number
};

export default SectionItem;
