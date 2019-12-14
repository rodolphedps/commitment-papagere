/**
 * Asynchronously loads the component for HomePage
 */
import Loadable from 'react-loadable';

import ReactLoadableLoadingIndicator from 'components/ReactLoadableLoadingIndicator';

export default Loadable({
  loader: () => import('./index'),
  loading: ReactLoadableLoadingIndicator,
});