import { Routes, Route, Navigate } from 'react-router-dom';

import { useGetConfigQuery, useGetGenresQuery } from './features/tmdbMovie/moviesApiSlice';
import { useGetShowGenresQuery } from './features/tmdbShows/showsApiSlice';

import Layout from './components/Layout';
import UsersList from './features/users/UsersList';
import UserPage from './features/users/UserPage';
import Auth from './features/auth/Auth';
import UserSettings from './features/auth/UserSettings'
import RequireAuth from './features/auth/RequireAuth';
import RequireUnAuth from './components/RequireUnAuth'

import UpdateProfile from './features/profile/UpdateProfile';
import ProfilePage from './features/profile/ProfilePage';
import AddProfile from './features/profile/AddProfile';
import RequirePin from './features/profile/RequirePin';
import CreatePin from './features/profile/CreatePin';

import HomePage from './features/tmdb/HomePage';
import MoviesPage from './features/tmdbMovie/MoviesPage';
import ShowsPage from './features/tmdbShows/ShowsPage';
import SingleMovie from './features/tmdbMovie/SingleMovie';
import SingleShow from './features/tmdbShows/SingleShow';
import SingleEpisode from './features/tmdbShows/SingleEpisode';
import TrendingPage from './features/tmdb/TrendingPage';
import GenrePage from './features/tmdb/GenrePage';
import MyFavorites from './features/profile/MyFavorites';
import SearchPage from './features/tmdb/SearchPage';


function App() {
  useGetConfigQuery('getConfig')
  useGetGenresQuery('getMoviesGenres')
  useGetShowGenresQuery('getShowGenres')

  return (
    <Routes>
      <Route element={<Layout />}> 

        <Route path="/" element={<HomePage />}/>

        {/* ROUTES FOR USERS AND AUTH */}
        <Route path='auth'>

          {/* PRIVATE ROUTES FOR LOGGED OUT USERS */}
          <Route element={<RequireAuth />}>
            <Route path="mypage" element={<UserSettings />} />

            <Route path='profile'>
              <Route path='pin' element={<CreatePin />}/>
              <Route path='favorites' element={<MyFavorites />}/>
              <Route element={<RequirePin />}>
                <Route path='manage' element={<ProfilePage />} />
                <Route path='addadult' element={<AddProfile />} />
                <Route path='addchild' element={<AddProfile isChild={true} />} />
                <Route path="update/:profileid" element={<UpdateProfile />}/>
              </Route>
            </Route>
            
          </Route>

          {/* PRIVATE ROUTES FOR LOGGED IN USERS */}
          <Route element={<RequireUnAuth />}>
            <Route path="login" element={<Auth />} /> 
          </Route>  
        </Route>

        {/* USER FEATURE ROUTES */}
        <Route path='users'>
          <Route element={<RequireAuth />}>
            <Route path="list" element={<UsersList />} />
            <Route path=":userId" element={<UserPage />} />
          </Route>
        </Route>

        {/* TMDB FEATURE ROUTES */}
        <Route path='tmdb'>
          <Route path='search' element={<SearchPage />} />
          <Route path='trending' element={<TrendingPage />} />
          <Route path='movies' element={<MoviesPage />}/>
          <Route path='shows' element={<ShowsPage />}/>
          <Route path='movie/:id' element={<SingleMovie />}/>
          <Route path='show/:id' element={<SingleShow />}/>
          <Route path='show/:showId/season/:season/episode/:ep' element={<SingleEpisode />}/>
          <Route path='genre/:genre/:id' element={<GenrePage />}/>
        </Route>
        

        {/* Catch all - replace with 404 component if you want */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Route>
    </Routes>
    
  );
}

export default App;
