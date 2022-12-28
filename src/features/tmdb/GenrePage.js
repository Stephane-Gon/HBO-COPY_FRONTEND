import { useParams } from "react-router-dom";
import { useState } from "react";

import { useGetMovieByGenreQuery } from "../tmdbMovie/moviesApiSlice";
import { useGetShowByGenreQuery } from "../tmdbShows/showsApiSlice";

import ItemsByGenre from "./ItemByGenre";
import SecSlider from "./SecSlider";
import GenreHighLight from "./GenreHighLight";

const GenrePage = () => {
  const params = useParams()
  const [page, setPage] = useState(1)
  const [keyWord, setKeyWord] = useState('highlights')

  const movies = useGetMovieByGenreQuery({ genre : params.id, page })
  const shows = useGetShowByGenreQuery({ genre: params.id, page })

  const handleGenre = (e) => {
    setKeyWord(e.target.value)
    setPage(1)
  }

  let buttonsMain = (
    <>
      <button 
        value="highlights"
        className={`my-btn ${keyWord === 'highlights' ? "active" : ""}`}
        onClick={() => setKeyWord('highlights')}
      >
        Highlights
      </button>
      {
        shows.data?.results.length !== 0 && (
          <button 
            value="shows" 
            className={`my-btn ${keyWord === "shows" ? "active" : ""}`}
            onClick={(e) => handleGenre(e)}
          >
            Shows
          </button>
        )
      }
      {
        movies.data?.results.length !== 0 && (
          <button 
            value="movies"
            className={`my-btn ${keyWord === "movies" ? "active" : ""}`}
            onClick={(e) => handleGenre(e)}
          >
            Movies
          </button>
        )
      }
    </>
  )

  let content
  if(keyWord === "shows") {
    content = <ItemsByGenre data={shows} page={page} setPage={setPage} isMovie={false}/>
  } else if(keyWord === "movies") {
    content = <ItemsByGenre data={movies} page={page} setPage={setPage}/>
  } else if(keyWord === "highlights" && shows.data?.results.length !== 0 && movies.data?.results.length !== 0) {
    content = <GenreHighLight shows={shows} movies={movies} />
  } else if(keyWord === "highlights" && shows.data?.results.length !== 0 ) {
    content = <GenreHighLight shows={shows} />
  } else if (keyWord === "highlights"  && movies.data?.results.length !== 0) {
    content = <GenreHighLight movies={movies} />
  }

  return (
    <div className="highlights-wrapper">
      <SecSlider showsData={shows} moviesData={movies} /> 

      <div className='keywords-wrapper'>
        <div className='keywords-mains'>
          { buttonsMain }
        </div>
      </div>
      {content}

    </div>
  )
}

export default GenrePage