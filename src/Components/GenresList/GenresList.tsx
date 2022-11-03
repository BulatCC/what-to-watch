import { useState } from 'react';

type GenresListProps = {
    genresList: string[];
    defaultGennre: string;
    activeGenreHandler: (genre: string) => void;
};

const GenresList = ({ genresList, defaultGennre,  activeGenreHandler }: GenresListProps) => {
    const [activeGenre, setActiveGenre] = useState<string>(defaultGennre);
    const genresListwithAllGenres = [defaultGennre, ...genresList];
    
    return (
        <ul className='catalog__genres-list'>
            {genresListwithAllGenres.map(genre => (
                <li key={genre} className={`catalog__genres-item ${activeGenre === genre ? 'catalog__genres-item--active' : ''}`}>
                    <a href='#' className='catalog__genres-link' onClick={(evt) => {
                        evt.preventDefault();
                        setActiveGenre(genre);
                        activeGenreHandler(genre);
                    }}>{genre}</a>
                </li>
            ))}
        </ul>
    );
}

export { GenresList };
