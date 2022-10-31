import { useState, useEffect, useContext } from 'react';
import { Header } from '../../components/Header/Header';
import { FilmCardPreview } from '../../components/FilmCardPreview/FilmCardPreview';
import { FilmCardBackground } from '../../components/FilmCardBackground/FilmCardBackground';
import { GenresList } from '../../components/GenresList/GenresList';
import { FilmsList } from '../../components/FilmsList/FilmsList';
import { Footer } from '../../components/Footer/Footer';
import { Loader } from '../../components/Loader/Loader';
import { getGenries, filterFilmsByGenre } from '../../Services/Utils';
import { DEFAULT_GENRE } from '../../consts';
import { FilmCardType } from '../../Types/Films';

import { appContext } from '../../Context/App';

const Main = () => {
    const { state: { defaultFilmsData, isDataLoaded, currentFilm } } = useContext(appContext);
    const [activeGenre, setActiveGenre] = useState<string>(DEFAULT_GENRE);
    const [filteredFilms, setFilteredFilms] = useState<FilmCardType[]>(defaultFilmsData);

    const genries = getGenries(defaultFilmsData);

    useEffect(() => {
        const filteredGenries = filterFilmsByGenre(defaultFilmsData, DEFAULT_GENRE, activeGenre);
        setFilteredFilms(filteredGenries);
    }, [activeGenre, defaultFilmsData]);

    if (!isDataLoaded) {
        return <Loader />;
    }

    return (
        <>
            <section className='film-card'>
                {currentFilm && <FilmCardBackground img={currentFilm.previewImage} altText={currentFilm.name} />}
                <Header cssClass='film-card__head' />
                <FilmCardPreview />
            </section>
            <div className='page-content'>
                <section className='catalog'>
                    <GenresList genresList={genries} activeGenreHandler={setActiveGenre} defaultGennre={DEFAULT_GENRE} />
                    <FilmsList films={filteredFilms} />
                </section>
                <Footer />
            </div>
        </>
    );
}

export { Main };
