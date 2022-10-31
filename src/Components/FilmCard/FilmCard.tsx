import { useState, useEffect } from 'react';
import { FilmCardType } from '../../Types/Films';
import { Link, generatePath } from 'react-router-dom';
import { AppRoute } from '../../consts';

type FilmCardProps = {
    filmData: FilmCardType;
};

const FilmCard = ({ filmData: { id, previewImage, name, previewVideoLink } }: FilmCardProps) => {
    const link = generatePath(AppRoute.Film, { id: id && id });
    const [isMouseInside, setIsMouseInside] = useState(false);
    const [showVideo, setShowVideo] = useState(isMouseInside);

    useEffect(() => {
        let timeOut: ReturnType<typeof setTimeout> | null = null;
        if (isMouseInside) {
            timeOut = setTimeout(() => {
                setShowVideo(isMouseInside);
            }, 1000);
        }

        return () => {
            timeOut && clearTimeout(timeOut)
            setShowVideo(false);
        }
    }, [isMouseInside]);

    return (
        <article className='small-film-card catalog__films-card'
        onMouseEnter={() => {
            setIsMouseInside(true);
        }}
        onMouseLeave={() => {
            setIsMouseInside(false);
        }}>
            <Link to={link} style={{
                color: '#c9b37e',
            }}>
                <div className='small-film-card__image'>
                    {showVideo
                        ?
                        <video className='player__video' src={previewVideoLink} autoPlay muted width='280' height='175'></video>
                        :
                        <img src={previewImage} alt={name} width='280' height='175' />
                    }

                </div>
                <h3 className='small-film-card__title'>
                    <span className='small-film-card__link'>{name}</span>
                </h3>
            </Link>
        </article>
    );
}

export { FilmCard };
