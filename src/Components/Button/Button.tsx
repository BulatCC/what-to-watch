import { Link, generatePath } from 'react-router-dom';

type ButtonProps = {
    title: string;
    linkPath?: string;
    linkId?: string;
    svgHref?: string;
};

const Button = ({ title, svgHref, linkPath, linkId }: ButtonProps): JSX.Element => {
    {
        if (linkPath) {
            const link = generatePath(linkPath, { id: linkId && linkId });
            return (
                <Link to={link} className={'btn film-card__button'}>
                    {svgHref && <svg viewBox="0 0 19 19" width="19" height="19">
                        <use xlinkHref={svgHref}></use>
                    </svg>}
                    {title}
                </Link>
            )
        } else {
            return (
                <button className="btn film-card__button" type="button">
                    {svgHref && <svg viewBox="0 0 19 19" width="19" height="19">
                        <use xlinkHref={svgHref}></use>
                    </svg>}

                    <span>{title}</span>
                </button>
            )
        }
    }
}

export { Button };