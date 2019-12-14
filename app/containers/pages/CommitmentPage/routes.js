import HourlyRate from './component/HourlyRate/Loadable';
import Route from './containers/Route';
import UnauthLayout from 'containers/App/components/UnauthLayout';

const routes = [
    {
        route: Route,
        path: '/commitment/hourly_rate',
        component: HourlyRate,
        layout: UnauthLayout,
        allowConnected: true,
    },
]

export default routes;