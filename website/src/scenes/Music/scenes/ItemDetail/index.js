import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { AppContext } from '../../../../contexts';

const ItemDetailWrapper = styled.div`
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
`;

const ItemHeaderWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: block;
  }
`;

const ItemCoverArtWrapper = styled.div`
  flex: 1;
`;

const ItemDetailsWrapper = styled.div`
  flex: 2;
`;

const ItemTracksWrapper = styled.div``;

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
        <ItemCoverArtWrapper>ItemCoverArtWrapper</ItemCoverArtWrapper>
        <ItemDetailsWrapper>ItemDetailsWrapper</ItemDetailsWrapper>
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
