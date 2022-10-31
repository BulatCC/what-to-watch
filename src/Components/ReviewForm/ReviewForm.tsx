import { useState, ChangeEvent, Fragment } from 'react';

const ReviewForm = () => {
    const [review, setReview] = useState({
        rating: '',
        comment: '',
    });

    const formChangeHandler = ({ target }: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setReview({
            ...review,
            [target.name]: target.value,
        })
    }

    return (
        <form action="#" className="add-review__form">
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

            <div className="add-review__text">
                <textarea className="add-review__textarea" name="comment" id="comment" placeholder="Review text" onChange={formChangeHandler} style={{
                    height: ' 150px'
                }}></textarea>
                <div className="add-review__submit">
                    <button className="add-review__btn" type="submit">Post</button>
                </div>
            </div>
        </form>
    );
}

export { ReviewForm };
