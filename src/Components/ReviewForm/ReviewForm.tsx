import { useState, ChangeEvent, Fragment, useContext, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { ApiRoute, AppRoute } from '../../consts';
import { createApi } from '../../Services/Api';

type ReviewFormProps = {
    bgColor: string;
    filmId: number;
};

const ReviewForm = ({ bgColor, filmId }: ReviewFormProps) => {
    const navigate = useNavigate();
    const [review, setReview] = useState({
        rating: '',
        comment: '',
    });
    const [error, setError] = useState<boolean | string >(false);

    const api = createApi();

    const formChangeHandler = ({ target }: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setReview({
            ...review,
            [target.name]: target.value,
        })
    }

    const errorHandler = () => {
        let rateError = '';
        let commentError = '';
        if (!review.rating) {
            rateError = 'Выберите рейтинг';
        }

        if (!review.comment) {
            commentError = 'Напишите отзыв';
        }

        if (rateError || commentError) {
            return `${rateError} ${commentError}`;
        }
        return false
    }

    const reviewSubmitHandler = (evt: FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        let isError = errorHandler();
        setError(isError);
        if (!isError) {
            api.post(`${ApiRoute.Comments}/${filmId}`, review)
            .then(() => {
                navigate(`${AppRoute.Film}/${filmId}`);
            })
            .catch((e) => console.log(e));
        }
    }

    return (
        <form action="#" className="add-review__form" onSubmit={reviewSubmitHandler}>
            <div className="rating">
                <div className="rating__stars">
                    {[...Array(10)].map((_, i, arr) => (
                        <Fragment key={i}>
                            <input className="rating__input" id={`star-${arr.length - i}`} type="radio" name="rating" value={arr.length - i} checked={(arr.length - i).toString() === review.rating} onChange={formChangeHandler} />
                            <label className="rating__label" htmlFor={`star-${arr.length - i}`} >{`Rating ${arr.length - i}`}</label>
                        </Fragment >
                    ))}

                </div>
            </div>

            <div className="add-review__text" style={{
                backgroundColor: bgColor,
                filter: 'brightness(85%)',
                overflow: 'hidden',
            }}>
                <textarea className="add-review__textarea" name="comment" id="comment" placeholder="Review text" onChange={formChangeHandler} style={{
                    height: '150px',
                    backgroundColor: bgColor,
                }}></textarea>
                <div className="add-review__submit">
                    <button className="add-review__btn" type="submit">Post</button>
                </div>
            </div>
            {error && <p style={{color: 'red'}}>{error}</p>}
        </form>
    );
}

export { ReviewForm };
