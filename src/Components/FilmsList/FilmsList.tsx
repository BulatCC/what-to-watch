import { useState, useEffect } from 'react';
import { FilmCardType } from '../../Types/Films';
import { FilmCard } from '../FilmCard/FilmCard';
import { ButtonBig } from '../ButtonBig/ButtonBig';

type FilmsListProps = {
    films: FilmCardType[];
};

const MAX_FILMS_AT_ONCE = 8;

const FilmsList = ({ films }: FilmsListProps) => {
    const [maxFilms, setMaxFilms] = useState(MAX_FILMS_AT_ONCE);
    const buttonClickHandler = () => {
        if (maxFilms <= films.length) {
            setMaxFilms(MAX_FILMS_AT_ONCE + maxFilms);
        }
    }

    useEffect(() => {
        setMaxFilms(MAX_FILMS_AT_ONCE);
    }, [films]);

    const cuttedFilms = films.slice(0, maxFilms);
    
    return (
        <>
            <div className='catalog__films-list'>
                {cuttedFilms.map(film => (
                    <FilmCard filmData={film} key={film.id} />
                ))}
            </div>
            <div className='catalog__more'>
                {maxFilms <= films.length && <ButtonBig title='Show more' btnCssClass='catalog__button' clickHandler={buttonClickHandler} /> }
            </div>
        </>
    );
}

export { FilmsList };
