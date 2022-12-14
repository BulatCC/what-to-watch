import { createContext, ReactNode, useReducer } from 'react';
import { AuthorizationStatus } from '../consts';
import { actions } from './Actions';
import { AppState, ActionType, ContextType } from  '../Types/Context';

type UserContextProviderProps = {
    children: ReactNode;
}

const initialState: AppState = {
    isDataLoaded: false,
    defaultFilmsData: [],
    authorizationStatus: AuthorizationStatus.Unknown,
    currentFilm: null,
    userData: {
        avatarUrl: '',
        email: '',
    }
};

const reducer = (state: AppState, action: ActionType) => {
    const { type, payload } = action;
    switch (type) {
        case actions.LoadFilms:
            return {
                ...state,
                defaultFilmsData: payload,
            };
        case actions.IsLoaded:
            return {
                ...state,
                isDataLoaded: payload,
            };
        case actions.CurrentFilm:
            return {
                ...state,
                currentFilm: payload,
            };
        case actions.Auth:
            return {
                ...state,
                authorizationStatus: payload,
            };
        case actions.SetUserData:
            return {
                ...state,
                userData: payload,
            };
        default:
            return state;
    }
};

const appContext = createContext<ContextType>({
    state: initialState,
    dispatch: () => null,
});

const AppContextProvider = ({ children }: UserContextProviderProps): JSX.Element => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <appContext.Provider value={{ state, dispatch }}>
            {children}
        </appContext.Provider>
    )
}

export { AppContextProvider, appContext, initialState, reducer };
