import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { appContext } from '../../Context/App';
import { AppRoute, AuthorizationStatus } from '../../consts';
import { apiActions } from '../../Context/ApiActions';

const UserBlock = () => {
    const { dispatch, state: { authorizationStatus, userData: { email, avatarUrl } } } = useContext(appContext);
    const logoutClickHandler = () => {
        apiActions.logout(dispatch);
    }

    return (
        <>
            {authorizationStatus === AuthorizationStatus.Auth
                ?
                <ul className='user-block'>
                    <li className='user-block__item'>
                        <Link to={AppRoute.MyList} className={'user-block__avatar'}>
                            <div className='user-block__avatar'>
                                <img src={avatarUrl} alt='User avatar' width='63' height='63' />
                            </div>
                        </Link>
                    </li>
                    <li className='user-block__item'>
                        <Link to={AppRoute.MyList} className={'user-block__link'} style={{ display: 'block', marginBottom: '10px' }}>
                            {email}
                        </Link>
                        <span onClick={logoutClickHandler} className='user-block__link'>Sign out</span>
                    </li>
                </ul>
                :
                <div className='user-block'>
                    <Link to={AppRoute.Login} className={'user-block__link'}>Sign in</Link>
                </div>
            }
        </>
    )
}

export { UserBlock };

