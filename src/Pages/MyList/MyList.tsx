import { useContext } from 'react';
import { Header } from '../../Components/Header/Header';
import { FilmsList } from '../../Components/FilmsList/FilmsList';
import { Footer } from '../../Components/Footer/Footer';
import { Loader } from '../../Components/Loader/Loader';
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
