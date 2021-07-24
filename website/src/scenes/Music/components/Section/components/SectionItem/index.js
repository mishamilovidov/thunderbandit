import _ from 'lodash';
import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';
import styled from 'styled-components';
import { AppContext } from '../../../../../../contexts';

const Item = styled.div`
  margin-right: 24px;

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
`;

const ItemDetails = styled.div`
  p {
    background-color: ${({ data, theme }) =>
      data === 1 ? 'none' : theme.scenes.music.coverart.placeholderColor};
    animation: ${({ data }) =>
      data === 1 ? 'unset' : `pulse 1s infinite ease-in-out`};
    border-radius: 6px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const ItemTitle = styled.p`
  margin: unset;
  margin-top: 0.75rem;
  min-height: 1.1rem;
  font-size: 1.1rem;
  width: ${({ data, theme }) =>
    data === 1 ? theme.scenes.music.coverart.width : '75%'};
`;

const ItemSubtitle = styled.p`
  margin: unset;
  margin-top: 0.25rem;
  min-height: 0.9rem;
  font-size: 0.9rem;
  width: ${({ data, theme }) =>
    data === 1 ? theme.scenes.music.coverart.width : '55%'};
`;

const SectionItem = ({ item }) => {
  const {
    state: { firebase, theme }
  } = useContext(AppContext);
  const [imgUrl, setImgUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const { data, datetime } = item;
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
      <ItemDetails theme={theme} data={Number(!_.isEmpty(data))}>
        <ItemTitle theme={theme} data={Number(!_.isEmpty(data))}>
          {_.get(data, 'name', '')}
        </ItemTitle>
        <ItemSubtitle theme={theme}>
          {datetime && moment.unix(_.get(datetime, 'seconds')).year()}
        </ItemSubtitle>
      </ItemDetails>
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
