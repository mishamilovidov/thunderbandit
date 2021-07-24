import _ from 'lodash';
import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import SectionItem from './components/SectionItem';
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

const SectionContent = styled.div`
  display: flex;
  overflow-x: auto;
  align-items: flex-start;
  margin-bottom: 48px;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const Section = ({ title, type }) => {
  const {
    state: { firebase, theme }
  } = useContext(AppContext);
  const [items, setItems] = useState(null);
  const placeholders = Array(10)
    .fill()
    .map(() => uuidv4());
  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await firebase.firestore
          .collection('releases')
          .where('type', '==', type)
          .orderBy('datetime', 'desc')
          .limit(7)
          .get();
        const releases = snapshot.docs
          .map(doc => doc.data())
          .reduce((acc, cur, idx) => {
            acc.push({ index: idx, id: cur.item.id });
            return acc;
          }, []);
        const promises = releases.reduce((acc, cur) => {
          acc.push(
            firebase.firestore
              .collection(`${type}s`)
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
  }, [type]);

  return (
    <SectionWrapper theme={theme}>
      <SectionHeader>{title}</SectionHeader>
      <SectionContent>
        {items
          ? items.map(item => <SectionItem key={item.id} item={item} />)
          : placeholders.map(item => <SectionItem key={item} item={item} />)}
      </SectionContent>
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
