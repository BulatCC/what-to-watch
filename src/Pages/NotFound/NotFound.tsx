import { Header } from '../../Components/Header/Header';
import { NavLink } from 'react-router-dom';
import { AppRoute } from '../../consts';

const NotFound = () => {
    return (
        <>
            <div className='page-content'>
            <Header isPageMain={false} />
                <section className='catalog'>
                    <h1>Такой страницы нет</h1>
                </section>

                <NavLink to={AppRoute.Root} style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '20px',
                }}
                >
                    На главную
                </NavLink>
            </div>
        </>
    );
}

export { NotFound };
