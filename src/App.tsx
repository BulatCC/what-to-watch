import { useEffect, useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AppRoute,ApiRoute } from './consts';
import { Main } from './Pages/Main/Main';
import { Login } from './Pages/Login/Login';
import { MyList } from './Pages/MyList/MyList';
import { Film } from './Pages/Film/Film';
import { AddReview } from './Pages/AddReview/AddReview';
import { NotFound } from './Pages/NotFound/NotFound';
import { Player } from './Pages/Player/Player';
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute';
import { appContext } from './Context/App';
import { actionCreator } from './Context/Actions';
import { createApi } from './Services/Api';

const App = () => {
    const { dispatch } = useContext(appContext);
    const api = createApi();

    useEffect(() => {
        api.get(ApiRoute.Films)
        .then(({ data }) => {
            dispatch(actionCreator.loadFilms(data));
            dispatch(actionCreator.isDataLoaded(true));
        })
        .catch((e) => console.log(e));
        api.get(ApiRoute.Promo)
        .then(({ data }) => {
            dispatch(actionCreator.currentFilm(data));
        })
        .catch((e) => console.log(e));
    }, []);

    return (
        <Routes>
            <Route path={AppRoute.Root} element={<Main />} />
            <Route path={AppRoute.Login} element={<Login />} />
            <Route path={AppRoute.Film} element={<Film />} />
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
