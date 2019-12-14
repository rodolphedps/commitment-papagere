import ProtectedRoute from './containers/ProtectedRoute';
import Route from './containers/Route';

import UnauthLayout from './components/UnauthLayout';

import {
  LoginPage,
  CommitmentPage,
  HourlyRate,
  CommitmentChildInfos,
  CommitmentChild,
  CommitmentSchedule,
  CommitmentScheduleEditor,
  CommitmentCreation,
  CommitmentSummary,
} from '../pages';

const routes = [
  {
    route: Route,
    path: '/commitment',
    component: CommitmentPage,
    layout: UnauthLayout,
    allowConnected: true,
  },
  {
    route: Route,
    path: '/commitment/generate_commitment',
    component: CommitmentCreation,
    layout: UnauthLayout,
    allowConnected: true,
  },
  {
    route: Route,
    path: '/commitment/generate_commitment/summary',
    component: CommitmentSummary,
    layout: UnauthLayout,
    allowConnected: true,
  },
  {
    route: Route,
    path: '/commitment/hourly_rate',
    component: HourlyRate,
    layout: UnauthLayout,
    allowConnected: true,
  },
  {
    route: Route,
    path: '/commitment/add_child',
    component: CommitmentChildInfos,
    layout: UnauthLayout,
    allowConnected: true,
  },
  {
    route: Route,
    path: '/commitment/infos_child/:id',
    component: CommitmentChild,
    layout: UnauthLayout,
    allowConnected: true,
  },
  {
    route: Route,
    path: '/commitment/infos_child/:id/:index/schedule',
    component: CommitmentSchedule,
    layout: UnauthLayout,
    allowConnected: true,
  },
  {
    route: Route,
    path: '/commitment/infos_child/:id/schedule/:index/edit_schedule',
    component: CommitmentScheduleEditor,
    layout: UnauthLayout,
    allowConnected: true,
  },
  {
    route: Route,
    path: '/',
    component: LoginPage,
    layout: UnauthLayout,
  },
  // {
  //   route: Route,
  //   path: '/createpassword',
  //   component: PasswordCreationPage,
  //   layout: UnauthLayout,
  // },
  // {
  //   route: ProtectedRoute,
  //   path: '/planning',
  //   component: PlanningTab,
  //   exact: false,
  //   layoutProps: {
  //     hideNavigationBar: true,
  //   },
  // },
  // {
  //   route: ProtectedRoute,
  //   path: '/holidays',
  //   component: HolidaysTab,
  //   exact: false,
  //   layoutProps: {
  //     hideNavigationBar: true,
  //   },
  // },
  // {
  //   route: ProtectedRoute,
  //   path: '/contracts',
  //   component: ContractsTab,
  //   exact: false,
  //   layoutProps: {
  //     hideNavigationBar: true,
  //   },
  // },
  // {
  //   route: ProtectedRoute,
  //   path: '/account',
  //   component: AccountTab,
  //   exact: false,
  //   layoutProps: {
  //     hideNavigationBar: true,
  //   },
  // },
  // {
  //   route: ProtectedRoute,
  //   path: '/wages',
  //   component: WagesPage,
  // },
  // {
  //   route: ProtectedRoute,
  //   path: '/wages/:journalId',
  //   component: WageDetailPage,
  //   layoutProps: {
  //     hideNavigationBar: true,
  //   },
  // },
  // {
  //   route: ProtectedRoute,
  //   path: '/child/:childId',
  //   component: ChildDetailPage,
  //   layoutProps: {
  //     hideNavigationBar: true,
  //   },
  // },
];

export default routes;
