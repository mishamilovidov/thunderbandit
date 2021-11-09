import _ from 'lodash';
import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { withRouter } from 'react-router-dom';
import MusicItem from '../../../../components/MusicItem';
import VideoItem from '../../../../components/VideoItem';
import { AppContext } from '../../../../contexts';

const TypeDetailWrapper = styled.div`
  width: ${({ theme }) => theme.widths.content.xl};
  margin: 0px auto;

  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.xl}) {
    width: ${({ theme }) => theme.widths.content.lg};
  }

  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    width: ${({ theme }) => theme.widths.content.md};
  }

  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: ${({ theme }) => theme.widths.content.sm};
  }
`;

const Title = styled.div`
  min-height: 100px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    min-height: 55px;
  }
`;

const TitleText = styled.div`
  font-size: 50px;
  width: ${({ theme }) => theme.widths.content.xl};
  margin: 0 auto;
  margin-top: 0px;
  font-weight: bold;
  color: #ffffff;
  text-transform: uppercase;

  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    font-size: 40px;
  }

  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: ${({ theme }) => theme.widths.content.sm};
  }

  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 30px;
  }
`;

const TypeDetailContent = styled.div`
  display: grid;
  grid-template-columns: ${({ theme, type }) =>
    type === 'videos'
      ? 'auto auto'
      : `repeat(auto-fit, minmax(${theme.scenes.music.coverart.width.default}, 1fr))`};
  gap: 1rem;
  margin-bottom: ${({ theme, heightKey }) =>
    theme.scenes.music.coverart.height[heightKey]};

  > div {
    ${({ type }) => (type === 'videos' ? 'grid-template-columns: auto;' : '')}
    ${({ type }) => (type === 'videos' ? 'padding: 0px;' : '')}
  }

  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    ${({ type }) => (type === 'videos' ? 'display: block;' : '')}

    > div {
      ${({ type }) => (type === 'videos' ? 'display: block;' : '')}
      ${({ type }) => (type === 'videos' ? 'margin-bottom: 1rem;' : '')};
    }
  }
`;

const TypeDetail = props => {
  const {
    state: { firebase, theme }
  } = useContext(AppContext);
  const placeholders = Array(25)
    .fill()
    .map(() => uuidv4());
  const {
    match: {
      params: { type }
    }
  } = props;
  const [items, setItems] = useState(null);
  const renderItem = (item, key) =>
    type === 'videos' ? (
      <VideoItem key={key} item={item} />
    ) : (
      <MusicItem key={key} item={item} />
    );
  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await firebase.firestore
          .collection('releases')
          .where('type', '==', type.slice(0, -1))
          .orderBy('datetime', 'desc')
          .get();
        const releases = snapshot.docs
          .map(doc => doc.data())
          .reduce((acc, cur, idx) => {
            acc.push({
              index: idx,
              id: cur.item.id,
              datetime: cur.datetime,
              type
            });
            return acc;
          }, []);
        const promises = releases.reduce((acc, cur) => {
          acc.push(
            firebase.firestore
              .collection(type)
              .doc(cur.id)
              .get()
          );
          return acc;
        }, []);
        const documents = await Promise.all(promises);
        documents.forEach(doc => {
          const itemIndex = _.findIndex(releases, o => o.id === doc.id);
          releases[itemIndex].data = doc.data();
        });
        setItems(_.orderBy(releases, 'index'));
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
    window.scrollTo(0, 0);
  }, [type]);

  return (
    <TypeDetailWrapper theme={theme}>
      <Title theme={theme}>
        <TitleText theme={theme}>{type}</TitleText>
      </Title>
      <TypeDetailContent
        theme={theme}
        type={type}
        heightKey={type === 'videos' ? 'video' : 'default'}
      >
        {items
          ? items.map(item => renderItem(item, item.key))
          : placeholders.map(item => renderItem(item, item))}
      </TypeDetailContent>
    </TypeDetailWrapper>
  );
};

TypeDetail.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired
};

TypeDetailWrapper.propTypes = {
  theme: PropTypes.objectOf(PropTypes.any).isRequired
};

Title.propTypes = {
  theme: PropTypes.objectOf(PropTypes.any).isRequired
};

TitleText.propTypes = {
  theme: PropTypes.objectOf(PropTypes.any).isRequired
};

TypeDetailContent.propTypes = {
  theme: PropTypes.objectOf(PropTypes.any).isRequired
};

export default withRouter(TypeDetail);
