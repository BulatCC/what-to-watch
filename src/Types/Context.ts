import { FilmCardType } from './Films';

type AppState = {
    isDataLoaded: boolean;
    defaultFilmsData: FilmCardType[];
    authorizationStatus: string;
    currentFilm: null | FilmCardType;
    userData: {
        avatarUrl: string;
        email: string;
    }
}

type ContextType = {
    state: AppState;
    dispatch: (arg?: any) => Record<string, unknown> | boolean | null | void;
}

type ActionType = {
    type: string,
    payload: any
}

type dispatchType = (arg?: Record<string, unknown>) => void;

export type { AppState, ContextType, ActionType, dispatchType };