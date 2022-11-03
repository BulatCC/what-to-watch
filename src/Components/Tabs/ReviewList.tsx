import { useEffect, useState } from 'react';
import { Review } from './Review';
import { ApiRoute } from '../../consts';
import { createApi } from '../../Services/Api';
import { Loader } from '../Loader/Loader';
import { ReviewType } from '../../Types/Review';

type ReviewListProps = {
    id: string;
}

const ReviewList = ({ id }: ReviewListProps) => {
    const [reviewData, setReviewData] = useState<ReviewType[]>([]);
    const api = createApi();

    useEffect(() => {
        api.get(`${ApiRoute.Comments}/${id}`)
            .then(({ data }) => {
                setReviewData(data);
            })
            .catch((e) => console.log(e));
    }, [id]);

    if (!reviewData) {
        return <Loader />;
    }

    const even = reviewData.filter((_, i) => i % 2 === 0);
    const odd = reviewData.filter((_, i) => i % 2 === 1);

    return (
        <div className="film-card__reviews film-card__row">
            {
                reviewData.length === 0
                    ?
                    <h2>No reviews</h2>
                    :
                    <>
                        <div className="film-card__reviews-col">
                            {even.map(review => <Review review={review} key={review.id} />)}
                        </div>
                        <div className="film-card__reviews-col">
                            {odd.map(review => <Review review={review} key={review.id} />)}
                        </div>
                    </>
            }
        </div>
    );
}

export { ReviewList };
