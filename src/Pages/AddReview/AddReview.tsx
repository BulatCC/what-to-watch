import { Header } from '../../components/Header/Header';
import { FilmCardBackground } from '../../components/FilmCardBackground/FilmCardBackground';
import { BreadCrumbs } from '../../components/BreadCrumbs/BreadCrumbs';
import { ReviewForm } from '../../components/ReviewForm/ReviewForm';

const crumbsData = [
    {
        title: 'The Grand Budapest Hotel',
        link: '/',
    },
    {
        title: 'Add review',
        link: '/',
    }
];

const AddReview = () => {
    return (
        <>
            <section className='film-card film-card--full'>
                <div className="film-card__header">
                    <FilmCardBackground img='img/bg-the-grand-budapest-hotel.jpg' altText='Budapest' />
                    <Header isPageMain={false} userBlock={true} children={<BreadCrumbs crumbsData={crumbsData} />} />
                    <div className="film-card__poster film-card__poster--small">
                        <img src="img/the-grand-budapest-hotel-poster.jpg" alt="The Grand Budapest Hotel poster" width="218" height="327" />
                    </div>
                </div>
                <div className="add-review">
                    <ReviewForm/>
                </div>
            </section>
        </>
    );
}

export { AddReview };
