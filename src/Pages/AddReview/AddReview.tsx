import { useContext, useEffect, useState } from 'react';
import { Header } from '../../Components/Header/Header';
import { FilmCardBackground } from '../../Components/FilmCardBackground/FilmCardBackground';
import { Loader } from '../../Components/Loader/Loader';
import { BreadCrumbs } from '../../Components/BreadCrumbs/BreadCrumbs';
import { ReviewForm } from '../../Components/ReviewForm/ReviewForm';
import { AppRoute } from '../../consts';
import { appContext } from '../../Context/App';

const AddReview = () => {
    const { state: { currentFilm } } = useContext(appContext);

    if (!currentFilm) {
        return <Loader />;
    }

    const { backgroundImage, backgroundColor, posterImage, name, id } = currentFilm;
    const crumbsData = [
        {
            title: name,
            link: `${AppRoute.Film}/${id}`,
        },
        {
            title: 'Add review',
            link: '/',
        }
    ];

    return (
        <>
            <section className='film-card film-card--full' style={{ backgroundColor: backgroundColor }}>
                <div className="film-card__header">
                    <FilmCardBackground img={backgroundImage} altText={name} />
                    <Header isPageMain={false} userBlock={true}>
                        <BreadCrumbs crumbsData={crumbsData} />
                    </Header>
                    <div className="film-card__poster film-card__poster--small">
                        <img src={posterImage} alt={name} width="218" height="327" />
                    </div>
                </div>
                <div className="add-review">
                    <ReviewForm bgColor={backgroundColor} filmId={id} />
                </div>
            </section>
        </>
    );
}

export { AddReview };
