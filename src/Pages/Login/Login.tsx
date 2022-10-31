import { Header } from '../../components/Header/Header';
import { LoginForm } from '../../components/LoginForm/LoginForm';
import { Footer } from '../../components/Footer/Footer';

const Login = () => {
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
