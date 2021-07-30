import _ from 'lodash';
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { withRouter } from 'react-router-dom';
import MusicItem from '../../../../components/MusicItem';
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
  grid-template-columns: ${({ theme }) =>
    `repeat(auto-fill, minmax(${theme.scenes.music.coverart.height}, 1fr))`};
  grid-gap: 1rem;
  margin-bottom: ${({ theme }) => theme.scenes.music.coverart.height};

  > div {
    display: grid;
  }
`;

const TypeDetail = props => {
  const {
    state: { theme }
  } = useContext(AppContext);
  const placeholders = Array(25)
    .fill()
    .map(() => uuidv4());
  const { match } = props;
  console.log(placeholders);

  return (
    <TypeDetailWrapper theme={theme}>
      <Title theme={theme}>
        <TitleText theme={theme}>{match.params.type}</TitleText>
      </Title>
      <TypeDetailContent theme={theme}>
        {placeholders.map(p => (
          <MusicItem key={p} item={p} />
        ))}
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
