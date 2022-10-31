import { FilmCardType } from './Films';

type AppState = {
    isDataLoaded: boolean;
    defaultFilmsData: FilmCardType[];
    authorizationStatus: string;
    currentFilm: null | FilmCardType;
}

type ContextType = {
    state: AppState;
    dispatch: any;
}

type ActionType = {
    type: string, 
    payload: any
}

export { type AppState, type ContextType, type ActionType };