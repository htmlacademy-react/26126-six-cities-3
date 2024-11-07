import {Navigate} from 'react-router-dom';
import {AuthorizationStatus} from '../../store/const';
import {AppRoute} from '../app/const';

type LoginRouteProps = {
  status: AuthorizationStatus;
  children: JSX.Element;
}

function LoginPrivateRoute(props: LoginRouteProps):JSX.Element {
  const {status, children} = props;
  return (
    status === AuthorizationStatus.Auth ?
      <Navigate to={AppRoute.Main}/> :
      children
  );
}

export default LoginPrivateRoute;
