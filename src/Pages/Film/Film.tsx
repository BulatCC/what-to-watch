import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { FilmCardBackground } from '../../components/FilmCardBackground/FilmCardBackground';
import { Button } from '../../components/Button/Button';
import { FilmsList } from '../../components/FilmsList/FilmsList';
import { Tabs } from '../../components/Tabs/Tabs';
import { Loader } from '../../components/Loader/Loader';
import { AppRoute, AuthorizationStatus, ApiRoute } from '../../consts';
import { appContext } from '../../Context/App';
import { actionCreator } from '../../Context/Actions';
import { useScrollTop } from '../../Hooks/UseScrollTop';
import { createApi } from '../../Services/Api';
import { FilmCardType } from '../../Types/Films';

const Film = () => {
    const { state: { authorizationStatus } } = useContext(appContext);
    const [filmData, setFilmData] = useState<FilmCardType | null>(null);
    const [similarFilmData, setSimilarFilmData] = useState<FilmCardType[] | null>(null);
    const { dispatch } = useContext(appContext);
    const api = createApi();
    useScrollTop();
    const urlId = useParams().id || '';

    useEffect(() => {
        api.get(`${ApiRoute.Films}/${urlId}`)
            .then(({ data }) => {
                dispatch(actionCreator.currentFilm(data));
                setFilmData(data);
            })
            .catch((e) => console.log(e));
        api.get(`${ApiRoute.Films}/${urlId}/similar`)
            .then(({ data }) => {
                setSimilarFilmData(data);
            })
            .catch((e) => console.log(e));
    }, [urlId]);

    if (!filmData) {
        return <Loader />;
    }

    const { backgroundImage, backgroundColor, posterImage, name, genre, released, id } = filmData;

    return (
        <>
            <section className='film-card film-card--full' style={{backgroundColor: backgroundColor}}>
                <div className='film-card__hero'>
                    <FilmCardBackground img={backgroundImage} altText={name} />
                    <Header isPageMain={false} cssClass='user-page__head' userBlock={true} />
                    <div className='film-card__wrap'>
                        <div className='film-card__desc'>
                            <h2 className='film-card__title'>{name}</h2>
                            <p className='film-card__meta'>
                                <span className='film-card__genre'>{genre}</span>
                                <span className='film-card__year'>{released}</span>
                            </p>

                            <div className='film-card__buttons'>
                                <Button title='Play' svgHref='#play-s' linkPath={AppRoute.Player} linkId={id.toString()} />
                                {authorizationStatus === AuthorizationStatus.Auth && <Button title='My list' svgHref='#add' />}
                                <Button title='Add review' linkPath={AppRoute.Review} linkId={id.toString()} />
                            </div>
                        </div>
                    </div>

                </div>
                <div className='film-card__wrap film-card__translate-top'>
                    <div className='film-card__info'>
                        <div className='film-card__poster film-card__poster--big'>
                            <img src={posterImage} alt={name} width='218' height='327' />
                        </div>

                        <div className='film-card__desc'>
                            <Tabs tabsData={filmData} filmId={urlId} />
                        </div>
                    </div>
                </div>
            </section>

            <div className='page-content'>
                <section className='catalog catalog--like-this'>
                    <h2 className="catalog__title">More like this</h2>
                    {similarFilmData && <FilmsList films={similarFilmData} />}
                    
                </section>
                <Footer isPageMain={false} />
            </div>
        </>
    );
}

export { Film };
