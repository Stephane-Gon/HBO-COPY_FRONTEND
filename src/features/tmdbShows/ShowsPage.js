import { useState } from 'react';
import { useSelector } from 'react-redux';

import { selectShowGenres } from '../tmdb/tmdbSlice';
import { 
  useGetPopularShowsQuery,
  useGetShowByGenreQuery,
  useGetTopShowsQuery,
} from './showsApiSlice';

import HeroSlider from '../tmdb/HeroSlider';
import ShowsHighlights from './ShowsHighlights';
import ItemsByGenre from '../tmdb/ItemByGenre';

const ShowsPage = () => {
  const [keyWord, setKeyWord] = useState(null)
  const [page, setPage] = useState(1)
  const show_genres = useSelector(selectShowGenres)
  let gridNofCells = show_genres.genres.length / 2
  
  const popularShows = useGetPopularShowsQuery({ page })
  const topShows = useGetTopShowsQuery({ page })
  const showByGenre = useGetShowByGenreQuery({ genre: keyWord, page })

  const handleGenre = (e) => {
    setKeyWord(Number(e.target.value))
    setPage(1)
  }
  

  let buttonsGenres = show_genres.genres.map((genre, i) => {
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
    content = <ShowsHighlights/>
  } else if(keyWord === 1) {
    content = <ItemsByGenre data={topShows} page={page} setPage={setPage} isMovie={false} />
  } else if(keyWord === 2) {
    content = <ItemsByGenre data={popularShows} page={page} setPage={setPage} isMovie={false} />
  }else {
    content = <ItemsByGenre data={showByGenre} page={page} setPage={setPage} isMovie={false} />
  }

  return (
    <div>
      <HeroSlider data={popularShows} isMovie={false}/>
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

export default ShowsPage