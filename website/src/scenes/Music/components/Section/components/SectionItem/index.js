import _ from 'lodash';
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { AppContext } from '../../../../../../contexts';

const PlaceholderWrapper = styled.div`
  height: ${({ theme }) => theme.scenes.music.coverart.height};
  min-width: ${({ theme }) => theme.scenes.music.coverart.width};
  background-color: ${({ theme }) =>
    theme.scenes.music.coverart.placeholderColor};
  animation: ${({ pulse }) =>
    pulse ? 'pulse 1s infinite ease-in-out' : 'unset'};
  margin-right: 18px;
  border-radius: 6px;

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

const SectionItem = ({ item }) => {
  const {
    state: { theme }
  } = useContext(AppContext);

  return _.isString(item) ? (
    <PlaceholderWrapper theme={theme} pulse />
  ) : (
    <PlaceholderWrapper theme={theme} pulse={false} />
  );
};

SectionItem.propTypes = {
  item: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.objectOf(PropTypes.any)
  ]).isRequired
};

PlaceholderWrapper.propTypes = {
  pulse: PropTypes.bool.isRequired,
  theme: PropTypes.objectOf(PropTypes.any).isRequired
};

export default SectionItem;
