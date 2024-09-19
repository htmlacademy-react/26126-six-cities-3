import {Navigate} from 'react-router-dom';
import {AuthorizationStatus} from './const';
import {AppRoute} from '../app/const';

type PrivateRouteProps = {
  status: AuthorizationStatus;
  children: JSX.Element;
}

function PrivateRoute(props: PrivateRouteProps):JSX.Element {
  const {status, children} = props;
  return (
    status === AuthorizationStatus.Auth ?
      children :
      <Navigate to={AppRoute.Login}/>
  );
}

export default PrivateRoute;
