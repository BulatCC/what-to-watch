import { useEffect, useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AppRoute } from './consts';
import { Main } from './Pages/Main/Main';
import { Login } from './Pages/Login/Login';
import { MyList } from './Pages/MyList/MyList';
import { Film } from './Pages/Film/Film';
import { AddReview } from './Pages/AddReview/AddReview';
import { NotFound } from './Pages/NotFound/NotFound';
import { Player } from './Pages/Player/Player';
import { PrivateRoute } from './Components/PrivateRoute/PrivateRoute';
import { appContext } from './Context/App';
import { apiActions } from './Context/ApiActions';

const App = () => {
    const { dispatch } = useContext(appContext);

    useEffect(() => {
        apiActions.getFilms(dispatch);
        apiActions.getPromoFilm(dispatch);
        apiActions.checkAuthStatus(dispatch);
    }, []);

    return (
        <Routes>
            <Route path={AppRoute.Root} element={<Main />} />
            <Route path={AppRoute.Login} element={<Login />} />
            <Route path={AppRoute.FilmId} element={<Film />} />
            <Route path={AppRoute.Review} element={<AddReview />} />
            <Route path={AppRoute.Player} element={<Player />} />
            <Route path={AppRoute.MyList}
                element={<PrivateRoute privateElement={<MyList />} />}
            />
            <Route path={AppRoute.NotFound} element={<NotFound />} />
        </Routes>
    );
}

export { App };
