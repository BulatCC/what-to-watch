import { ApiRoute } from '../consts';
import { actionCreator } from './Actions';
import { createApi } from '../Services/Api';
import { AuthData } from '../Types/Auth';
import { dispatchType } from '../Types/Context';
import { saveToken, dropToken } from '../Services/Token';
import { AuthorizationStatus } from '../consts';

const api = createApi();

const apiActions = {
    getFilms: async (dispatch: dispatchType) => {
        api.get(ApiRoute.Films)
            .then(({ data }) => {
                dispatch(actionCreator.loadFilms(data));
                dispatch(actionCreator.isDataLoaded(true));
            })
            .catch((e) => console.log(e));
    },
    getPromoFilm: async (dispatch: dispatchType) => {
        api.get(ApiRoute.Promo)
            .then(({ data }) => {
                dispatch(actionCreator.currentFilm(data));
            })
            .catch((e) => console.log(e));
    },
    getCurrentFilm: async (dispatch: dispatchType, urlId: string) => {
        api.get(`${ApiRoute.Films}/${urlId}`)
            .then(({ data }) => {
                dispatch(actionCreator.currentFilm(data));
            })
            .catch((e) => console.log(e));
    },
    login: async (dispatch: dispatchType, { email, password }: AuthData) => {
        api.post(ApiRoute.Login, { email, password })
            .then(({ data }) => {
                saveToken(data.token);
                dispatch(actionCreator.auth(AuthorizationStatus.Auth));
                dispatch(actionCreator.setUserData({
                    avatarUrl: data.avatarUrl,
                    email: data.email,
                }));
            })
            .catch((e) => console.log(e));
    },
    checkAuthStatus: async (dispatch: dispatchType) => {
        api.get(ApiRoute.Login)
            .then(({ data }) => {
                dispatch(actionCreator.auth(AuthorizationStatus.Auth));
                dispatch(actionCreator.setUserData({
                    avatarUrl: data.avatarUrl,
                    email: data.email,
                }));
            })
            .catch(() => dispatch(actionCreator.auth(AuthorizationStatus.NoAuth)));
    },
    logout: async (dispatch: dispatchType) => {
        api.delete(ApiRoute.Logout)
            .then(() => {
                dropToken();
                dispatch(actionCreator.setUserData({
                    avatarUrl: '',
                    email: '',
                }));
                dispatch(actionCreator.auth(AuthorizationStatus.NoAuth));
            })
            .catch((e) => console.log(e));
    },
    favoriteAddRemove: async (dispatch: dispatchType, filmId: number, isFavorite: number) => {
        api.post(`${ApiRoute.Favorite}/${filmId}/${isFavorite}`)
            .then(({ data }) => {
                dispatch(actionCreator.currentFilm(data));
            })
            .catch((e) => console.log(e));
    },
}

export { apiActions };
