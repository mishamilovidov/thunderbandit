import _ from 'lodash';
import React, { useContext, useEffect, useState } from 'react';
import moment from 'moment-timezone';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { AppContext } from '../../../../../../contexts';

const TrackWrapper = styled.div`
  background-size: cover;
  background-repeat: no-repeat;
  background-color: ${({ showBackground }) =>
    showBackground === 0 ? 'rgb(165, 165, 165, 0.05)' : 'unset'};
  border-radius: 4px;
  width: 100%;
  height: 3em;
  display: flex;

  p {
    background-size: cover;
    background-repeat: no-repeat;
    background-color: ${({ item, theme }) =>
      item === 1 ? theme.scenes.music.coverart.placeholderColor : 'unset'};
    animation: ${({ item }) =>
      item === 0 ? `pulse 1s infinite ease-in-out` : 'unset'};
    border-radius: 6px;
    color: rgb(255, 255, 255, 0.8);
    height: ${({ item }) => (item === 0 ? '1em' : 'unset')};
  }
`;

const TrackNumberWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3em;
  flex-shrink: 0;
`;

const TrackNumber = styled.p`
  width: ${({ item }) => (item === 0 ? '30%' : 'unset')};
`;

const TrackNameWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex: 1;
`;

const TrackName = styled.p`
  color: #ffffff !important;
  width: ${({ item }) => (item === 0 ? '45%' : 'unset')};
`;

const TrackDurationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 6em;
  flex-shrink: 0;
`;

const TrackDuration = styled.p`
  width: 50%;
`;

const Track = ({ number, showBackground, track }) => {
  const {
    state: { theme }
  } = useContext(AppContext);
  const [item, setItem] = useState(null);
  const renderDuration = duration => {
    const dur = moment.duration(duration);
    const h = dur.hours();
    const m = dur.minutes();
    const s = dur.seconds();
    const hrs = _.padStart(h, 1, '0');
    const mins = _.padStart(m, 2, '0');
    const secs = _.padStart(s, 2, '0');

    return `${h !== 0 ? `${hrs}:` : ''}${mins}:${secs}`;
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const doc = await track.get();
        const trackData = { id: doc.id, ...doc.data() };
        setItem(trackData);
      } catch (err) {
        console.error(err);
      }
    };

    if (!_.isEmpty(track)) {
      fetchData();
    }
  }, [track]);

  return (
    <TrackWrapper
      item={Number(item)}
      showBackground={showBackground}
      tabIndex={0}
      theme={theme}
    >
      <TrackNumberWrapper>
        <TrackNumber item={Number(item)}>{item && number}</TrackNumber>
      </TrackNumberWrapper>
      <TrackNameWrapper>
        <TrackName item={Number(item)}>{item && item.name}</TrackName>
      </TrackNameWrapper>
      <TrackDurationWrapper>
        <TrackDuration item={Number(item)}>
          {item && renderDuration(item.duration)}
        </TrackDuration>
      </TrackDurationWrapper>
    </TrackWrapper>
  );
};

Track.propTypes = {
  number: PropTypes.number.isRequired,
  showBackground: PropTypes.number.isRequired,
  track: PropTypes.objectOf(PropTypes.any).isRequired
};

export default Track;
