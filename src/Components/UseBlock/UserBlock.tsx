import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { appContext } from '../../Context/App';
import { AppRoute, AuthorizationStatus } from '../../consts';

const UserBlock = () => {
    const { state: {authorizationStatus} } = useContext(appContext);

    return (
        <>
            {authorizationStatus === AuthorizationStatus.Auth
                ?
                <ul className='user-block'>
                    <li className='user-block__item'>
                        <Link to={AppRoute.MyList} className={'user-block__avatar'}>
                            <div className='user-block__avatar'>
                                <img src='img/avatar.jpg' alt='User avatar' width='63' height='63' />
                            </div>
                        </Link>
                    </li>
                    <li className='user-block__item'>
                        <a className='user-block__link'>Sign out</a>
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

