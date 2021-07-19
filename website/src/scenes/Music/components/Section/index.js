import React, { useContext, useEffect } from 'react';
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

const Section = ({ collections, title }) => {
  const {
    state: { firebase, theme }
  } = useContext(AppContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await firebase.firestore.collection(collections[0]).get();
        console.debug(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [collections]);

  return (
    <SectionWrapper theme={theme}>
      <SectionHeader>{title}</SectionHeader>
    </SectionWrapper>
  );
};

Section.propTypes = {
  collections: PropTypes.objectOf(PropTypes.array).isRequired,
  title: PropTypes.string.isRequired
};

SectionWrapper.propTypes = {
  theme: PropTypes.objectOf(PropTypes.object).isRequired
};

export default Section;
