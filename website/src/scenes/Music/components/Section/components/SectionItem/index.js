import _ from 'lodash';
import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import moment from 'moment-timezone';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { AppContext } from '../../../../../../contexts';

const Item = styled.div`
  margin-right: 1em;
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

const CoverArt = styled.div`
  background-image: url(${({ img }) => img});
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  height: ${({ theme, type }) =>
    type === 'video'
      ? theme.scenes.music.coverart.height.video
      : theme.scenes.music.coverart.height.default};
  width: ${({ theme, type }) =>
    type === 'video'
      ? theme.scenes.music.coverart.width.video
      : theme.scenes.music.coverart.width.default};
  background-color: ${({ theme }) =>
    theme.scenes.music.coverart.placeholderColor};
  animation: ${({ loading }) =>
    loading === 1 ? `pulse 1s infinite ease-in-out` : 'unset'};
  border-radius: 6px;

  :hover {
    cursor: pointer;
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
  width: ${({ data, theme, widthKey }) =>
    data === 1 ? theme.scenes.music.coverart.width[widthKey] : '75%'};

  :hover {
    cursor: pointer;
  }
`;

const ItemSubtitle = styled.p`
  margin: unset;
  margin-top: ${({ datetime, loading }) =>
    loading === 0 || datetime ? '0.25rem' : '0.65rem'};
  min-height: 0.9rem;
  font-size: 0.9rem;
  width: ${({ data, theme, widthKey }) =>
    data === 1 ? theme.scenes.music.coverart.width[widthKey] : '55%'};
`;

const SectionItem = ({ history, item, itemType }) => {
  const {
    state: { firebase, theme }
  } = useContext(AppContext);
  const [imgUrl, setImgUrl] = useState(null);
  const [itemData, setItemData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { data, datetime, type } = item;
  const slug =
    itemType === 'video' ? _.get(itemData, 'id', '') : _.get(data, 'slug', '');
  const onItemClick = e => {
    e.preventDefault();
    if (itemType === 'video') {
      window.open(`https://www.youtube.com/watch?v=${data.id}`);
    } else {
      history.push(`/music/${type}/${slug}`);
    }
  };
  const onItemKeyUp = e => {
    if (e.key === 'Enter') {
      if (itemType === 'video') {
        window.open(`https://www.youtube.com/watch?v=${data.id}`);
      } else {
        history.push(`/music/${type}/${slug}`);
      }
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
    if (data) {
      if (itemType === 'video') {
        getData();
      } else {
        getUrl();
      }
    }
  }, [firebase, data, itemType]);

  return (
    <Item>
      <CoverArt
        theme={theme}
        type={itemType}
        img={imgUrl}
        title={
          itemType === 'video'
            ? _.get(itemData, 'title', '')
            : _.get(data, 'name', '')
        }
        loading={Number(loading)}
        onClick={e => onItemClick(e)}
        onKeyUp={e => onItemKeyUp(e)}
        tabIndex={0}
      />
      <ItemDetails
        theme={theme}
        data={Number(!_.isEmpty(itemType === 'video' ? itemData : data))}
      >
        <ItemLink
          onClick={e => onItemClick(e)}
          onKeyUp={e => onItemKeyUp(e)}
          tabIndex={0}
        >
          <ItemTitle
            theme={theme}
            widthKey={itemType === 'video' ? 'video' : 'default'}
            data={Number(!_.isEmpty(itemType === 'video' ? itemData : data))}
          >
            {itemType === 'video'
              ? _.get(itemData, 'title', '')
              : _.get(data, 'name', '')}
          </ItemTitle>
        </ItemLink>
        <ItemSubtitle
          theme={theme}
          widthKey={itemType === 'video' ? 'video' : 'default'}
          loading={Number(loading)}
          datetime={datetime}
        >
          {datetime &&
            (itemType === 'video' ? itemData : true) &&
            moment.unix(_.get(datetime, 'seconds')).year()}
        </ItemSubtitle>
      </ItemDetails>
    </Item>
  );
};

SectionItem.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  item: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.objectOf(PropTypes.any)
  ]).isRequired,
  itemType: PropTypes.string.isRequired
};

CoverArt.propTypes = {
  theme: PropTypes.objectOf(PropTypes.any).isRequired,
  img: PropTypes.string,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  loading: PropTypes.number
};

export default withRouter(SectionItem);
