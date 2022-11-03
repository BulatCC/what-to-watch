import { useContext, useEffect, useState } from 'react';
import { Header } from '../../Components/Header/Header';
import { FilmsList } from '../../Components/FilmsList/FilmsList';
import { Footer } from '../../Components/Footer/Footer';
import { Loader } from '../../Components/Loader/Loader';
import { appContext } from '../../Context/App';
import { ApiRoute } from '../../consts';
import { createApi } from '../../Services/Api';
import { FilmCardType } from '../../Types/Films';

const MyList = () => {
    const { state: { currentFilm } } = useContext(appContext);
    const [favoriteFilms, setFavoriteFilms] = useState<FilmCardType[] | null>(null);
    const api = createApi();

    useEffect(() => {
        api.get(ApiRoute.Favorite)
            .then(({ data }) => {
                setFavoriteFilms(data)
            })
            .catch((e) => console.log(e));
    }, [currentFilm]);

    if (!favoriteFilms) {
        return <Loader />;
    }

    return (
        <div className='user-page'>
            <Header isPageMain={false} title='My list' cssClass='user-page__head' userBlock={true} />
            <section className="catalog">
                {favoriteFilms.length === 0 ? <h2>No fims in watch list</h2> : <FilmsList films={favoriteFilms}/> }
            </section>
            <Footer isPageMain={false} />
        </div>
    );
}

export { MyList };
