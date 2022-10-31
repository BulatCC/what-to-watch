type FilmCardBackgroundProps = {
    img: string;
    altText: string;
};

const FilmCardBackground = ({ img, altText }: FilmCardBackgroundProps) => {
    return (
        <div className="film-card__bg">
            <img src={img} alt={altText} />
        </div>
    );
}

export { FilmCardBackground };
