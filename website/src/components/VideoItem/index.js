import _ from 'lodash';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { AppContext } from '../../contexts';

const Item = styled.div`
  padding: 4px;

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

const ThumbnailWrapper = styled.div`
  width: 100%;
  padding-top: 56.25%; /* 16:9 Aspect Ratio */
  position: relative;
`;

const Thumbnail = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-image: url(${({ img }) => img});
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  background-color: ${({ theme }) =>
    theme.scenes.music.coverart.placeholderColor};
  animation: ${({ loading }) =>
    loading === 1 ? `pulse 1s infinite ease-in-out` : 'unset'};
  border-radius: 6px;

  :hover {
    cursor: ${({ data }) => (data === 1 ? `pointer` : `unset`)};
  }
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

const ItemLink = styled.a``;

const ItemTitle = styled.p`
  margin: unset;
  margin-top: 0.75rem;
  min-height: 1.1rem;
  font-size: 1.1rem;
  width: ${({ data, theme }) =>
    data === 1 ? theme.scenes.music.coverart.width.video : '75%'};

  :hover {
    cursor: ${({ data }) => (data === 1 ? `pointer` : `unset`)};
  }

  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: ${({ data }) => (data === 1 ? '100%' : '75%')};
  }
`;

const ItemSubtitle = styled.p`
  margin: unset;
  margin-top: ${({ datetime, loading }) =>
    loading === 0 || datetime ? '0.25rem' : '0.65rem'};
  min-height: 0.9rem;
  font-size: 0.9rem;
  width: ${({ data, theme }) =>
    data === 1 ? theme.scenes.music.coverart.width.video : '55%'};

  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: ${({ data }) => (data === 1 ? '100%' : '55%')};
  }
`;

const VideoItem = ({ history, item }) => {
  const {
    state: { theme }
  } = useContext(AppContext);
  const [itemData, setItemData] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const { data, datetime, type } = item;
  const slug = _.get(data, 'slug', '');
  const itemOnClick = e => {
    if (!loading) {
      e.preventDefault();
      history.push(`/videos/${type}/${slug}`);
      // window.open('https://soundcloud.com/user-237574876');
    }
  };
  const itemKeyUp = e => {
    if (e.key === 'Enter' && !loading) {
      e.preventDefault();
      history.push(`/videos/${type}/${slug}`);
      // window.open('https://soundcloud.com/user-237574876');
    }
  };
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios({
          method: 'GET',
          url: `https://www.youtube.com/oembed?url=http://www.youtube.com/watch?v=${data.id}&format=json`
        });

        setImgUrl(res.data.thumbnail_url);
        setItemData(res.data);
        return setLoading(false);
      } catch (err) {
        console.error(err);
        return setLoading(false);
      }
    };

    if (data) getData();
  }, [data]);

  return (
    <Item>
      <ThumbnailWrapper>
        <Thumbnail
          data={Number(!_.isEmpty(data))}
          theme={theme}
          img={imgUrl}
          title={_.get(itemData, 'title', '')}
          loading={Number(loading)}
          onClick={e => itemOnClick(e)}
          onKeyUp={e => itemKeyUp(e)}
          tabIndex={loading ? null : 0}
        />
      </ThumbnailWrapper>
      <ItemDetails theme={theme} data={Number(!_.isEmpty(data))}>
        <ItemLink
          onClick={e => itemOnClick(e)}
          onKeyUp={e => itemKeyUp(e)}
          target='_blank'
        >
          <ItemTitle theme={theme} data={Number(!_.isEmpty(data))}>
            {_.get(itemData, 'title', '')}
          </ItemTitle>
        </ItemLink>
        <ItemSubtitle
          theme={theme}
          loading={Number(loading)}
          datetime={datetime}
        >
          {datetime &&
            itemData &&
            moment.unix(_.get(datetime, 'seconds')).year()}
        </ItemSubtitle>
      </ItemDetails>
    </Item>
  );
};

VideoItem.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  item: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.objectOf(PropTypes.any)
  ]).isRequired
};

Thumbnail.propTypes = {
  data: PropTypes.number.isRequired,
  theme: PropTypes.objectOf(PropTypes.any).isRequired,
  img: PropTypes.string,
  title: PropTypes.string.isRequired,
  loading: PropTypes.number
};

ItemDetails.propTypes = {
  theme: PropTypes.objectOf(PropTypes.any).isRequired
};

ItemTitle.propTypes = {
  data: PropTypes.number.isRequired,
  theme: PropTypes.objectOf(PropTypes.any).isRequired
};

ItemSubtitle.propTypes = {
  theme: PropTypes.objectOf(PropTypes.any).isRequired
};

export default withRouter(VideoItem);
