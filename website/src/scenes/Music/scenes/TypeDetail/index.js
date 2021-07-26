import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
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

const TypeDetail = props => {
  const {
    state: { theme }
  } = useContext(AppContext);
  const { match } = props;
  console.log(match);

  return <TypeDetailWrapper theme={theme}>HellasdfaoWorld</TypeDetailWrapper>;
};

TypeDetail.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired
};

export default withRouter(TypeDetail);
