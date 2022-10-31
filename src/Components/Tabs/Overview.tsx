import { filmRate } from '../../Services/Utils';

type OverviewProps = {
    rating: number;
    scoresCount: number;
    description: string;
    director: string;
    starring: string[];
}

const Overview = ({rating, scoresCount, description, director, starring}: OverviewProps) => {
    return (
        <>
            <div className='film-rating'>
                <div className='film-rating__score'>{rating.toFixed(1)}</div>
                <p className='film-rating__meta'>
                    <span className='film-rating__level'>{filmRate(rating)}</span>
                    <span className='film-rating__count'>{scoresCount} ratings</span>
                </p>
            </div>

            <div className='film-card__text'>
                <p>{description}</p>
                <p className='film-card__director'><strong>Director: {director}</strong></p>

                <p className='film-card__starring'><strong>Starring: {starring.join(', ')}</strong></p>
            </div>
        </>
    );
}

export { Overview };
