import { FilmCardType } from '../Types/Films';

const actions = {
    LoadFilms: 'data/LoadFilms',
    IsLoaded: 'data/IsLoaded',
    CurrentFilm: 'data/CurrentFilm',
};

const actionCreator = {
    loadFilms: (payload: FilmCardType[]) => {
        return {
            type: actions.LoadFilms,
            payload: payload,
        }
    },
    isDataLoaded: (payload: boolean) => {
        return {
            type: actions.IsLoaded,
            payload: payload,
        }
    },
    currentFilm: (payload: FilmCardType) => {
        return {
            type: actions.CurrentFilm,
            payload: payload,
        }
    },
}

export { actions, actionCreator };
