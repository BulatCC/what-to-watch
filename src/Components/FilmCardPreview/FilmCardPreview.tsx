import { useContext } from 'react';
import { Button } from '../Button/Button';
import { AppRoute, AuthorizationStatus } from '../../consts';
import { appContext } from '../../Context/App';
import { Loader } from '../../Components/Loader/Loader';

type FilmCardPreviewProps = {

};

const FilmCardPreview = ({ }: FilmCardPreviewProps) => {
    const { state: { authorizationStatus, currentFilm } } = useContext(appContext);

    if (!currentFilm) {
        return <Loader />;
    }

    const { id, posterImage, name, genre, released } = currentFilm;

    return (
        <div className="film-card__wrap">
            <div className="film-card__info">
                <div className="film-card__poster">
                    <img src={posterImage} alt={name} width="218" height="327" />
                </div>

                <div className="film-card__desc">
                    <h2 className="film-card__title">{name}</h2>
                    <p className="film-card__meta">
                        <span className="film-card__genre">{genre}</span>
                        <span className="film-card__year">{released}</span>
                    </p>

                    <div className="film-card__buttons">
                        <Button title='Play' svgHref='#play-s' linkPath={AppRoute.Player} linkId={id.toString()} />
                        {authorizationStatus === AuthorizationStatus.Auth && <Button title='My list' svgHref='#add' />}
                    </div>
                </div>
            </div>
        </div>
    );
}

export { FilmCardPreview };
