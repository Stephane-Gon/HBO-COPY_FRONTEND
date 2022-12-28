import { useState } from 'react';
import { useSelector } from 'react-redux';

import { 
  useGetUpcomingMoviesQuery, 
  useGetMovieByGenreQuery, 
  useGetTopMoviesQuery,
  useGetPopularMoviesQuery,
} from './moviesApiSlice'
import { selectMovieGenres } from '../tmdb/tmdbSlice';

import HeroSlider from '../tmdb/HeroSlider';
import MoviesHighLights from './MoviesHighLights';
import ItemsByGenre from '../tmdb/ItemByGenre';

const MoviesPage = () => {
  const [keyWord, setKeyWord] = useState(null)
  const [page, setPage] = useState(1)
  const movieGenres = useSelector(selectMovieGenres)
  const gridNofCells = movieGenres.genres.length / 2

  const upcomingMovies = useGetUpcomingMoviesQuery('getMovies')
  const topMovies = useGetTopMoviesQuery({ page })
  const popularMovies = useGetPopularMoviesQuery({ page })
  const moviesByGenre = useGetMovieByGenreQuery({ genre: keyWord, page })

  const handleGenre = (e) => {
    setKeyWord(Number(e.target.value))
    setPage(1)
  }
  

  let buttonsGenres = movieGenres.genres.map((genre, i) => {
    return (
      <button 
        key={i + 1} 
        value={genre.id} 
        className={`my-btn ${keyWord === genre.id ? "active" : ""}`}
        onClick={(e) => handleGenre(e)}
      >
        { genre.name }
      </button>
    )
  })

  let buttonsMain = (
    <>
      <button 
        key={0}
        className={`my-btn ${keyWord === null ? "active" : ""}`}
        onClick={() => setKeyWord(null)}
      >
        Highlights
      </button>
      <button 
        key={1}
        value={1} 
        className={`my-btn ${keyWord === 1 ? "active" : ""}`}
        onClick={(e) => handleGenre(e)}
      >
        Top Rated
      </button>
      <button 
        key={2}
        value={2} 
        className={`my-btn ${keyWord === 2 ? "active" : ""}`}
        onClick={(e) => handleGenre(e)}
      >
        Popular
      </button>
    </>
  )

  let content
  if(keyWord === null) {
    content = <MoviesHighLights />
  } else if(keyWord === 1) {
    content = <ItemsByGenre data={topMovies} page={page} setPage={setPage}/>
  } else if(keyWord === 2) {
    content = <ItemsByGenre data={popularMovies} page={page} setPage={setPage}/>
  }else {
    content = <ItemsByGenre data={moviesByGenre} page={page} setPage={setPage}/>
  }
  
 

  return (
    <div>
      <HeroSlider data={upcomingMovies} />
      <div className='keywords-wrapper'>
        <div className='keywords-mains'>
          { buttonsMain }
        </div>
        <div className='keywords-genres' style={{gridTemplateColumns: `repeat(${gridNofCells}, 1fr)`}}>
          { buttonsGenres }
        </div>
      </div>
      
      { content }
    </div>
  )
}

export default MoviesPage