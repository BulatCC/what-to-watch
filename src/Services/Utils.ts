import { FilmRateDescription } from '../consts';
import { FilmCardType } from '../Types/Films';

const validateEmail = (value: string) => {
    const emailRegexp = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    return emailRegexp.test(value);
}

const filmRate = (rateNumber: number) => {
    switch (true) {
        case rateNumber < 3:
            return FilmRateDescription.Bad;
        case rateNumber < 5:
            return FilmRateDescription.Normal;
        case rateNumber < 8:
            return FilmRateDescription.Good;
        case rateNumber < 10:
            return FilmRateDescription.VeryGood;
        case rateNumber === 10:
            return FilmRateDescription.Awesome;
        default:
            return FilmRateDescription.NotRated;
    }
}

const getGenries = (data: FilmCardType[]) => {
    const genries = data.reduce((acc: string[], item) => {
        return [...acc, item.genre];
    }, []);
    return [...new Set(genries)];
}

const filterFilmsByGenre = (filmData: FilmCardType[], defaultGenre: string, activeGenre: string) => {
    if (activeGenre === defaultGenre) {
        return filmData;
    }
   return filmData.filter(film => film.genre === activeGenre);
};

const getFilmRunTime = (time: number) => {
    const hours = Math.floor( time / 60 );
    const minutes = time % 60
    return `${hours} : ${minutes}`;
};

const getVideoDuration = (videoDuration: number) => {
    const HOUR_OR_MINUT_LENGTH = 60;

    const getSeconds = () => {
        const secondsLength = Math.floor(videoDuration % HOUR_OR_MINUT_LENGTH);
        return secondsLength < 10 ? `0${secondsLength}` : secondsLength;
    }

    const getMinutes = () => {
        const NUMBER_WITH_ZERO = 9;
        let res = null;
        res = Math.floor(videoDuration / HOUR_OR_MINUT_LENGTH) % HOUR_OR_MINUT_LENGTH;

        if (res <= NUMBER_WITH_ZERO) {
            res = `0${res}`;
        }

        if (res === HOUR_OR_MINUT_LENGTH) {
            res = '00';
        }

        return res;
    }

    let hours = 0;
    let minutes: number | string = '00';
    let seconds: number | string = getSeconds();

    if (videoDuration >= HOUR_OR_MINUT_LENGTH) {
        hours = Math.floor(videoDuration / HOUR_OR_MINUT_LENGTH / HOUR_OR_MINUT_LENGTH);
        minutes = getMinutes();
    }

    return `${hours}:${minutes}:${seconds}`;
}

const timeToPercent = (time: number, currentTime: number) => {
    const onePercent = time / 100;
    return (currentTime / onePercent).toFixed(2);
}

const formatDate = (date: string) => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December',];
    const dateValue = new Date(Date.parse(date));
    return `${months[dateValue.getMonth()]} ${dateValue.getDay()}, ${dateValue.getFullYear()}`;
}

export {
    validateEmail, 
    filmRate, 
    getGenries, 
    filterFilmsByGenre, 
    getFilmRunTime, 
    getVideoDuration, 
    timeToPercent,
    formatDate,
};

