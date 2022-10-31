import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../consts';
import { UserBlock } from '../UseBlock/UserBlock';

type HeaderProps = {
    isPageMain?: boolean;
    title?: string | null;
    cssClass?: string;
    userBlock?: boolean;
    children?: ReactNode;
};

const Header = ({ isPageMain = true, title, cssClass, userBlock = true, children }: HeaderProps) => {
    return (
        <header className={`page-header ${cssClass}`}>
            <div className='logo'>
                {isPageMain
                    ?
                    <span className='logo__link'>
                        <span className='logo__letter logo__letter--1'>W</span>
                        <span className='logo__letter logo__letter--2'>T</span>
                        <span className='logo__letter logo__letter--3'>W</span>
                    </span>
                    :
                    <Link to={AppRoute.Root} className={'logo__link'}>
                        <span className='logo__letter logo__letter--1'>W</span>
                        <span className='logo__letter logo__letter--2'>T</span>
                        <span className='logo__letter logo__letter--3'>W</span>
                    </Link>
                }

            </div>
            {children}
            {title && <h1 className='page-title user-page__title'>{title}</h1>}
            {userBlock && <UserBlock />}
        </header>
    );
}

export { Header };
