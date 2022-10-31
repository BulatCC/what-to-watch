import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthorizationStatus, AppRoute } from '../../consts';
import { Loader } from '../Loader/Loader';
import { appContext } from '../../Context/App';

type PrivateRouteProps = {
    privateElement: JSX.Element,
}

const PrivateRoute = ({ privateElement }: PrivateRouteProps) => {
    const { state: {authorizationStatus} } = useContext(appContext);
    switch (authorizationStatus) {
        case AuthorizationStatus.Unknown:
            return <Loader />;
        case AuthorizationStatus.Auth:
            return privateElement;
        case AuthorizationStatus.NoAuth:
            return <Navigate to={AppRoute.Login} />;
        default:
            return <Navigate to={AppRoute.Root} />;
    }
}

export { PrivateRoute };
