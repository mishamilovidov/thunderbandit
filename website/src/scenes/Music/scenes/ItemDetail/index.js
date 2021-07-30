import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
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
  flex: 4;
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
`;

const ItemDetailsWrapper = styled.div`
  flex: 10;
  margin-left: 40px;

  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-left: 24px;
  }

  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.xs}) {
    margin: 40px 0px 0px 0px;
    text-align: center;
  }
`;

const ItemTracksWrapper = styled.div`
  margin-top: 40px;
`;

const ItemDetail = props => {
  const {
    state: { theme }
  } = useContext(AppContext);
  const { match } = props;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const data = await firebase.firestore.collection('')
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };
  //   fetchData();
  // }, [])

  return (
    <ItemDetailWrapper theme={theme}>
      <ItemHeaderWrapper theme={theme}>
        <ItemCoverArtWrapper>
          <CoverArtWrapper>
            <CoverArt theme={theme} img={null} loading={Number(true)} />
          </CoverArtWrapper>
        </ItemCoverArtWrapper>
        <ItemDetailsWrapper theme={theme}>
          ItemDetailsWrapper
        </ItemDetailsWrapper>
      </ItemHeaderWrapper>
      <ItemTracksWrapper>ItemTracksWrapper</ItemTracksWrapper>
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
