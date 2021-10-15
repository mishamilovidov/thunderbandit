import _ from 'lodash';
import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { AppContext } from '../../../../contexts';

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
  background-size: cover;
  background-repeat: no-repeat;
  height: ${({ theme, scene }) => theme.scenes[scene].coverart.height};
  min-width: ${({ theme, scene }) => theme.scenes[scene].coverart.width};
  background-color: ${({ theme, scene }) =>
    theme.scenes[scene].coverart.placeholderColor};
  animation: ${({ loading }) =>
    loading === 1 ? `pulse 1s infinite ease-in-out` : 'unset'};
  border-radius: 6px;

  :hover {
    cursor: pointer;
  }
`;

const ItemDetails = styled.div`
  p {
    background-color: ${({ data, theme, scene }) =>
      data === 1 ? 'none' : theme.scenes[scene].coverart.placeholderColor};
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
  width: ${({ data, theme, scene }) =>
    data === 1 ? theme.scenes[scene].coverart.width : '75%'};

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
  width: ${({ data, theme, scene }) =>
    data === 1 ? theme.scenes[scene].coverart.width : '55%'};
`;

const SectionItem = ({ history, item, scene }) => {
  const {
    state: { firebase, theme }
  } = useContext(AppContext);
  const [imgUrl, setImgUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const { data, datetime, type } = item;
  const slug = _.get(data, 'slug', '');
  // useEffect(() => {
  //   const getUrl = async () => {
  //     try {
  //       const url = await firebase.storage
  //         .ref('images/coverart')
  //         .child(`${data.slug}_150x150.png`)
  //         .getDownloadURL();
  //       setImgUrl(url);
  //       return setLoading(false);
  //     } catch (err) {
  //       console.error(err);
  //       return setLoading(false);
  //     }
  //   };
  //   if (data) getUrl();
  // }, [firebase, data]);

  console.log(theme.scenes[scene]);

  return (
    <Item>
      <CoverArt
        theme={theme}
        img={imgUrl}
        title={_.get(data, 'name', '')}
        scene={scene}
        loading={Number(loading)}
        onClick={e => {
          e.preventDefault();
          history.push(`/music/${type}/${slug}`);
          // window.open('https://soundcloud.com/user-237574876');
        }}
        onKeyUp={e => {
          if (e.key === 'Enter') {
            e.preventDefault();
            history.push(`/music/${type}/${slug}`);
            // window.open('https://soundcloud.com/user-237574876');
          }
        }}
        tabIndex={0}
      />
      <ItemDetails theme={theme} data={Number(!_.isEmpty(data))} scene={scene}>
        <ItemLink href='https://soundcloud.com/user-237574876' target='_blank'>
          <ItemTitle theme={theme} data={Number(!_.isEmpty(data))}>
            {_.get(data, 'name', '')}
          </ItemTitle>
        </ItemLink>
        <ItemSubtitle
          theme={theme}
          loading={Number(loading)}
          datetime={datetime}
        >
          {datetime && moment.unix(_.get(datetime, 'seconds')).year()}
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
  scene: PropTypes.string.isRequired
};

CoverArt.propTypes = {
  theme: PropTypes.objectOf(PropTypes.any).isRequired,
  img: PropTypes.string,
  title: PropTypes.string.isRequired,
  scene: PropTypes.string.isRequired,
  loading: PropTypes.number
};

export default withRouter(SectionItem);
