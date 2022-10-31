import { getFilmRunTime } from '../../Services/Utils';

type DetailsProps = {
    director: string;
    starring: string[];
    runTime: number;
    genre: string;
    released: number;
}

const Details = ({ director, starring, runTime, genre, released }: DetailsProps) => {
    return (
        <div className='film-card__text film-card__row'>
            <div className='film-card__text-col'>
                <p className='film-card__details-item'>
                    <strong className='film-card__details-name'>Director</strong>
                    <span className='film-card__details-value'>{director}</span>
                </p>
                <p className='film-card__details-item'>
                    <strong className='film-card__details-name'>Starring</strong>
                    <span className='film-card__details-value'>
                        {starring.map((actor, i) => (
                            <span key={actor}>
                                {starring.length !== i + 1
                                    ?
                                    <span style={{
                                        display: 'block',
                                        marginBottom: '3px',
                                    }}>{actor},</span>
                                    :
                                    <span>{actor}</span>
                                }
                            </span>
                        ))}
                    </span>
                </p>
            </div>

            <div className='film-card__text-col'>
                <p className='film-card__details-item'>
                    <strong className='film-card__details-name'>Run Time</strong>
                    <span className='film-card__details-value'>{getFilmRunTime(runTime)}</span>
                </p>
                <p className='film-card__details-item'>
                    <strong className='film-card__details-name'>Genre</strong>
                    <span className='film-card__details-value'>{genre}</span>
                </p>
                <p className='film-card__details-item'>
                    <strong className='film-card__details-name'>Released</strong>
                    <span className='film-card__details-value'>{released}</span>
                </p>
            </div>
        </div>
    );
}

export { Details };
