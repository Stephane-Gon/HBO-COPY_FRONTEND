import { 
  useGetPopularMoviesQuery, 
  useGetUpcomingMoviesQuery,
  useGetTopMoviesQuery,
  useGetNowMoviesQuery
} from './moviesApiSlice';

import NormalSlider from '../tmdb/NormalSlider';
import ItemDisplay from '../tmdb/ItemDisplay';

const MoviesHighLights = () => {
  const popularMovies = useGetPopularMoviesQuery('getMovies')
  const upcomingMovies = useGetUpcomingMoviesQuery('getMovies')
  const topMovies = useGetTopMoviesQuery('getMovies')
  const nowMovies = useGetNowMoviesQuery('getMovies')

  return (
    <div className='highlights-wrapper'>
      <NormalSlider title="Popular Movies!" sToShow={7} data={popularMovies} /> 
      <NormalSlider title="Upcoming Movies!" sToShow={5} data={upcomingMovies} /> 
      <ItemDisplay title="Almost released!" data={upcomingMovies} isMovie={true}/>
      <NormalSlider title="Top Rated Movies!" sToShow={7} data={topMovies} isRate={true} /> 
      <NormalSlider title="Now on Cinema!" sToShow={5} data={nowMovies} /> 
      <ItemDisplay title="In the cinema!" data={nowMovies} isMovie={true}/>
    </div>  
  )
}

export default MoviesHighLights