import _ from 'lodash';
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

const CoverArtWrapper = styled.div`
  width: 100%;
  padding-top: 100%; /* 1:1 Aspect Ratio */
  position: relative;
`;

const CoverArt = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-image: url(${({ img }) => img});
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
    data === 1 ? theme.scenes.music.coverart.width : '75%'};

  :hover {
    cursor: ${({ data }) => (data === 1 ? `pointer` : `unset`)};
  }
`;

const ItemSubtitle = styled.p`
  margin: unset;
  margin-top: 0.25rem;
  min-height: 0.9rem;
  font-size: 0.9rem;
  width: ${({ data, theme }) =>
    data === 1 ? theme.scenes.music.coverart.width : '55%'};
`;

const MusicItem = ({ history, item }) => {
  const {
    state: { firebase, theme }
  } = useContext(AppContext);
  const [imgUrl, setImgUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const { data, datetime, type } = item;
  const slug = _.get(data, 'slug', '');
  const itemOnClick = e => {
    if (!loading) {
      e.preventDefault();
      history.push(`/music/${type}/${slug}`);
      // window.open('https://soundcloud.com/user-237574876');
    }
  };
  const itemKeyUp = e => {
    if (e.key === 'Enter' && !loading) {
      e.preventDefault();
      history.push(`/music/${type}/${slug}`);
      // window.open('https://soundcloud.com/user-237574876');
    }
  };
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
      <CoverArtWrapper>
        <CoverArt
          data={Number(!_.isEmpty(data))}
          theme={theme}
          img={imgUrl}
          title={_.get(data, 'name', '')}
          loading={Number(loading)}
          onClick={e => itemOnClick(e)}
          onKeyUp={e => itemKeyUp(e)}
          tabIndex={loading ? null : 0}
        />
      </CoverArtWrapper>
      <ItemDetails theme={theme} data={Number(!_.isEmpty(data))}>
        <ItemLink
          onClick={e => itemOnClick(e)}
          onKeyUp={e => itemKeyUp(e)}
          tabIndex={loading ? null : 0}
          target='_blank'
        >
          <ItemTitle theme={theme} data={Number(!_.isEmpty(data))}>
            {_.get(data, 'name', '')}
          </ItemTitle>
        </ItemLink>
        <ItemSubtitle theme={theme}>
          {datetime && moment.unix(_.get(datetime, 'seconds')).year()}
        </ItemSubtitle>
      </ItemDetails>
    </Item>
  );
};

MusicItem.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  item: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.objectOf(PropTypes.any)
  ]).isRequired
};

CoverArt.propTypes = {
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

export default withRouter(MusicItem);
