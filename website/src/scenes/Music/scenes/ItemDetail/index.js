import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { withRouter } from 'react-router-dom';
import Track from './components/Track';
import { AppContext } from '../../../../contexts';

const ItemDetailWrapper = styled.div`
  color: #ffffff;
  width: ${({ theme }) => theme.widths.content.xl};
  margin: 26px auto 0px auto;

  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.xl}) {
    width: ${({ theme }) => theme.widths.content.lg};
  }

  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    width: ${({ theme }) => theme.widths.content.md};
  }

  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: ${({ theme }) => theme.widths.content.sm};
  }

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

const ItemHeaderWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.xs}) {
    display: block;
  }
`;

const ItemCoverArtWrapper = styled.div`
  flex: 3;

  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex: 4;
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
  animation: ${({ item }) =>
    item === 0 ? `pulse 1s infinite ease-in-out` : 'unset'};
  border-radius: 6px;
`;

const ItemDetailsWrapper = styled.div`
  flex: 10;
  margin-left: 40px;
  display: flex;
  flex-direction: column;

  > div {
    margin: 0.2em 0;
  }

  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-left: 24px;
  }

  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.xs}) {
    margin: 30px 0px 0px 0px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const ItemDetailTitleWrapper = styled.div`
  background-size: cover;
  background-repeat: no-repeat;
  background-color: ${({ item, theme }) =>
    item === 0 ? theme.scenes.music.coverart.placeholderColor : 'unset'};
  animation: ${({ item }) =>
    item === 0 ? `pulse 1s infinite ease-in-out` : 'unset'};
  border-radius: 6px;
  width: ${({ item }) => (item === 0 ? '16em' : 'unset')};
  height: ${({ item }) => (item === 0 ? '2em' : 'unset')};
`;

const ItemDetailTitle = styled.h2`
  margin: unset;
`;

const ItemDetailSubtitleWrapper = styled.div`
  background-size: cover;
  background-repeat: no-repeat;
  background-color: ${({ item, theme }) =>
    item === 0 ? theme.scenes.music.coverart.placeholderColor : 'unset'};
  animation: ${({ item }) =>
    item === 0 ? `pulse 1s infinite ease-in-out` : 'unset'};
  border-radius: 6px;
  width: ${({ item }) => (item === 0 ? '10em' : 'unset')};
  height: ${({ item }) => (item === 0 ? '1.5em' : 'unset')};
`;

const ItemDetailSubtitle = styled.h3`
  margin: unset;
`;

const ItemTracksWrapper = styled.div`
  margin: 40px 0px 80px 0px;
`;

const ItemDetail = props => {
  const {
    state: { firebase, theme }
  } = useContext(AppContext);
  const [item, setItem] = useState(null);
  const {
    match: {
      params: { type, slug }
    }
  } = props;
  const trackPlaceholders = Array(20)
    .fill()
    .map(() => ({}));
  const tracks = item ? item.tracks : trackPlaceholders;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await firebase.firestore
          .collection(type)
          .where('slug', '==', slug)
          .get();
        const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        const itemRef = await firebase.firestore.doc(`${type}/${items[0].id}`);
        const releasesSnapshot = await firebase.firestore
          .collection('releases')
          .where('item', '==', itemRef)
          .get();
        const releases = releasesSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        const imgUrl = await firebase.storage
          .ref('images/coverart')
          .child(`${items[0].slug}_150x150.png`)
          .getDownloadURL();
        setItem({ ...items[0], ...releases[0], ...{ imgUrl } });
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
    window.scrollTo(0, 0);
  }, [type, slug]);
  console.debug(item);

  return (
    <ItemDetailWrapper theme={theme}>
      <ItemHeaderWrapper theme={theme}>
        <ItemCoverArtWrapper theme={theme}>
          <CoverArtWrapper>
            <CoverArt
              theme={theme}
              img={item && item.imgUrl}
              item={Number(item)}
            />
          </CoverArtWrapper>
        </ItemCoverArtWrapper>
        <ItemDetailsWrapper theme={theme}>
          <ItemDetailTitleWrapper theme={theme} item={Number(item)}>
            <ItemDetailTitle>{item && item.name}</ItemDetailTitle>
          </ItemDetailTitleWrapper>
          <ItemDetailSubtitleWrapper theme={theme} item={Number(item)}>
            <ItemDetailSubtitle>
              {item && moment.unix(item.datetime.seconds).year()}
            </ItemDetailSubtitle>
          </ItemDetailSubtitleWrapper>
        </ItemDetailsWrapper>
      </ItemHeaderWrapper>
      <ItemTracksWrapper>
        {tracks.map((track, idx) => (
          <Track
            key={uuidv4()}
            number={idx + 1}
            showBackground={idx % 2}
            track={track}
          />
        ))}
      </ItemTracksWrapper>
    </ItemDetailWrapper>
  );
};

ItemDetail.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired
};

ItemDetailWrapper.propTypes = {
  theme: PropTypes.objectOf(PropTypes.any).isRequired
};

ItemHeaderWrapper.propTypes = {
  theme: PropTypes.objectOf(PropTypes.any).isRequired
};

export default withRouter(ItemDetail);
