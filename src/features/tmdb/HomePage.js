import { useSelector } from "react-redux";

import { 
  useGetPopularMoviesQuery, 
  useGetUpcomingMoviesQuery, 
  useGetTopMoviesQuery,
  useGetPopPersonQuery,
} from "../tmdbMovie/moviesApiSlice";
import { useGetPopularShowsQuery, useGetTopShowsQuery } from "../tmdbShows/showsApiSlice";
import { selectPersona } from "../auth/authSlice";

import HeroSlider from "./HeroSlider";
import NormalSlider from "./NormalSlider";
import ItemDisplay from "./ItemDisplay";
import PeopleSlider from "./PeopleSlider";
import FavoriteSlider from "./FavoriteSlider";

const HomePage = () => {
  const persona = useSelector(selectPersona)
  const popPerson = useGetPopPersonQuery('getPersons')
  const popularMovies = useGetPopularMoviesQuery('getMovies')
  const upcomingMovies = useGetUpcomingMoviesQuery('getMovies')
  const topMovies = useGetTopMoviesQuery('getMovies')
  const popularShows = useGetPopularShowsQuery('getShows')
  const topShows = useGetTopShowsQuery('getShows')

  return (
    <>
      <HeroSlider data={popularMovies} />

      { persona && persona?.favorites.length > 4 && <FavoriteSlider items={persona.favorites} /> }

      <NormalSlider 
        data={upcomingMovies} 
        sToShow={5} 
        title="Top Upcoming Movies:" 
      />
      
      <NormalSlider 
        data={popularShows} 
        sToShow={7} 
        title="Top Popular Shows:"
        isMovie={false}
      />

      <ItemDisplay title="Popular Movie!" data={popularMovies} isMovie={true} />

      <NormalSlider 
        data={topMovies} 
        sToShow={5} 
        title="Top Rated Movies:" 
        isRate={true}
      />

      <NormalSlider 
        data={topShows} 
        sToShow={7} 
        title="Top Rated Shows:" 
        isRate={true}
        isMovie={false}
      />

      <ItemDisplay title="Popular Show!" data={popularShows} isMovie={false} />

      <PeopleSlider 
        data={popPerson} 
        sToShow={5}
        title="Top Popular Persons:"
      />
    </>
  )
}

export default HomePage