import { useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactGA from 'react-ga';

const GAListener = ({ router }) => {
  const sendPageView = location => {
    ReactGA.set({ page: location.pathname });
    ReactGA.pageview(location.pathname);
  };

  useEffect(() => {
    sendPageView(router.history.location);
    router.history.listen(sendPageView);
  }, [router]);

  return this.props.children;
};

GAListener.propTypes = {
  router: PropTypes.objectOf(PropTypes.object)
};

export default GAListener;
