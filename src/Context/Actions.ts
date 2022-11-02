import { FilmCardType } from '../Types/Films';
import { UesrType } from '../Types/User';

const actions = {
    LoadFilms: 'data/LoadFilms',
    IsLoaded: 'data/IsLoaded',
    CurrentFilm: 'data/CurrentFilm',
    Auth: 'user/Auth',
    SetUserData: 'user/SetUserData'
};

const actionCreator = {
    loadFilms: (payload: FilmCardType[]) => {
        return {
            type: actions.LoadFilms,
            payload,
        }
    },
    isDataLoaded: (payload: boolean) => {
        return {
            type: actions.IsLoaded,
            payload,
        }
    },
    currentFilm: (payload: FilmCardType) => {
        return {
            type: actions.CurrentFilm,
            payload,
        }
    },
    auth: (payload: string) => {
        return {
            type: actions.Auth,
            payload,
        }
    },
    setUserData: (payload: UesrType) => {
        return {
            type: actions.SetUserData,
            payload,
        }
    },
}

export { actions, actionCreator };
