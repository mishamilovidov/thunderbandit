import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { AppContext } from '../../../../contexts';

const SectionWrapper = styled.div`
  width: ${({ theme }) => theme.widths.content.xl};
  margin: 0px auto;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

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

const SectionHeader = styled.h3`
  color: ${({ theme }) => theme.color};
`;

const Section = ({ title, type }) => {
  const {
    state: { firebase, theme }
  } = useContext(AppContext);
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);

  console.debug(items);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.time(type);
        const snapshot = await firebase.firestore
          .collection('releases')
          .where('type', '==', type)
          .limit(page * 10)
          .get();
        const releases = snapshot.docs
          .map(doc => doc.data())
          .reduce((accumulator, current, index) => {
            accumulator.push({ index, id: current.item.id });
            return accumulator;
          }, []);
        // const snapshotTest = await firebase.firestore
        //   .collection(`${type}s`)
        //   .where('uuid', 'in', releases.map)
        //   .get();
        console.timeEnd(type);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [type]);

  return (
    <SectionWrapper theme={theme}>
      <SectionHeader>{title}</SectionHeader>
    </SectionWrapper>
  );
};

Section.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
};

SectionWrapper.propTypes = {
  theme: PropTypes.objectOf(PropTypes.any).isRequired
};

export default Section;
