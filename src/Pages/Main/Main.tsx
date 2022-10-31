import { useState, useEffect, useContext } from 'react';
import { Header } from '../../Components/Header/Header';
import { FilmCardPreview } from '../../Components/FilmCardPreview/FilmCardPreview';
import { FilmCardBackground } from '../../Components/FilmCardBackground/FilmCardBackground';
import { GenresList } from '../../Components/GenresList/GenresList';
import { FilmsList } from '../../Components/FilmsList/FilmsList';
import { Footer } from '../../Components/Footer/Footer';
import { Loader } from '../../Components/Loader/Loader';
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
