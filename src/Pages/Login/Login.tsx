import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { Header } from '../../Components/Header/Header';
import { LoginForm } from '../../Components/LoginForm/LoginForm';
import { Loader } from '../../Components/Loader/Loader';
import { Footer } from '../../Components/Footer/Footer';
import { appContext } from '../../Context/App';
import { AuthorizationStatus, AppRoute } from '../../consts';

const Login = () => {
    const { state: { authorizationStatus } } = useContext(appContext);

    if (authorizationStatus === AuthorizationStatus.Unknown) {
        return <Loader />;
    }

    if (authorizationStatus === AuthorizationStatus.Auth) {
        return <Navigate to={AppRoute.Root} />;
    }

    return (
        <>
            <div className='user-page'>
                <Header isPageMain={false} title='Sign in' cssClass='user-page__head' userBlock={false} />
                <div className='sign-in user-page__content'>
                    <LoginForm />
                </div>
                <Footer isPageMain={false} />
            </div>
        </>
    );

}

export { Login };
