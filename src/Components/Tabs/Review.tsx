import { ReviewType } from '../../Types/Review';
import { formatDate } from '../../Services/Utils';

type ReviewProps = {
    review: ReviewType;
}

const Review = ({ review: { rating, comment, date, user: { id: name } } }: ReviewProps) => {
    return (
        <div className="review">
            <blockquote className="review__quote">
                <p className="review__text">{comment}</p>
                <footer className="review__details">
                    <cite className="review__author">{name}</cite>
                    <time className="review__date" dateTime="2016-12-24">{formatDate(date)}</time>
                </footer>
            </blockquote>
            <div className="review__rating">{rating.toFixed(1)}</div>
        </div>
    );
}

export { Review };
