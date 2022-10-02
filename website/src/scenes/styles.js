import PropTypes from 'prop-types';
import styled from 'styled-components';

const ContentWrapper = styled.div`
  min-height: 100vh;
  padding-bottom: 200px;

  a {
    :focus,
    :hover,
    :active {
      text-decoration: underline;
      color: ${({ theme }) => theme.colors.secondary};

      > p {
        color: ${({ theme }) => theme.colors.secondary};
      }
    }
  }
`;

const Title = styled.div`
  background-color: ${({ theme }) => theme.colors.secondary};
  min-height: 200px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    width: 100%;
    text-align: center;
    height: 150px;
  }

  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    min-height: 125px;
  }
`;

const TitleText = styled.div`
  font-size: 70px;
  width: ${({ theme }) => theme.widths.content.xl};
  margin: 0 auto;
  margin-top: 0px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
  text-transform: uppercase;

  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.xl}) {
    width: ${({ theme }) => theme.widths.content.md};
  }

  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    font-size: 60px;
  }

  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: ${({ theme }) => theme.widths.content.sm};
  }

  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 50px;
  }
`;

ContentWrapper.propTypes = {
  theme: PropTypes.objectOf(PropTypes.any).isRequired
};

Title.propTypes = {
  theme: PropTypes.objectOf(PropTypes.any).isRequired
};

TitleText.propTypes = {
  theme: PropTypes.objectOf(PropTypes.any).isRequired
};

export default { ContentWrapper, Title, TitleText };
