import { useContext } from 'react';
import { Header } from '../../components/Header/Header';
import { FilmsList } from '../../components/FilmsList/FilmsList';
import { Footer } from '../../components/Footer/Footer';
import { Loader } from '../../components/Loader/Loader';
import { appContext } from '../../Context/App';

const MyList = () => {
    const { state: { isDataLoaded, defaultFilmsData } } = useContext(appContext);

    if (!isDataLoaded) {
        return <Loader />;
    }

    return (
        <>
            <div className='user-page'>
                <Header isPageMain={false} title='My list' cssClass='user-page__head' userBlock={true} />
                <section className="catalog">
                    <FilmsList films={defaultFilmsData} />
                </section>
                <Footer isPageMain={false} />
            </div>
        </>
    );
}

export { MyList };
