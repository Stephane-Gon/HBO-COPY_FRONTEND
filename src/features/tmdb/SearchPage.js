import { useState, useEffect } from "react"

import { useGetPopularMoviesQuery, useGetTopMoviesQuery, useGetSearchQuery } from "../tmdbMovie/moviesApiSlice";
import { useGetPopularShowsQuery, useGetTopShowsQuery } from "../tmdbShows/showsApiSlice";

import ItemsByGenre from "./ItemByGenre";
import SearchHighlights from "./SearchHighlights";

const SearchPage = () => {
  const [search, setSearch] = useState('')
  const [keyWord, setKeyWord] = useState(null)
  const [page, setPage] = useState(1)

  const searchList = useGetSearchQuery({query: search})
  const topMovies = useGetTopMoviesQuery({ page })
  const popularMovies = useGetPopularMoviesQuery({ page })
  const topShows = useGetTopShowsQuery({ page })
  const popularShows = useGetPopularShowsQuery({ page })

  useEffect(() => {
    if (search !== '') {
      setKeyWord('search')
    } else if(search === '') {
      setKeyWord(null)
    }
  }, [search])

  const handleGenre = (e) => {
    setKeyWord(Number(e.target.value))
    setPage(1)
  }
  

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
        Popular Shows
      </button>
      <button 
        key={2}
        value={2} 
        className={`my-btn ${keyWord === 2 ? "active" : ""}`}
        onClick={(e) => handleGenre(e)}
      >
         Popular Movies
      </button>
      <button 
        key={3}
        value={3} 
        className={`my-btn ${keyWord === 3 ? "active" : ""}`}
        onClick={(e) => handleGenre(e)}
      >
        Top Shows
      </button>
      <button 
        key={4}
        value={4} 
        className={`my-btn ${keyWord === 4 ? "active" : ""}`}
        onClick={(e) => handleGenre(e)}
      >
        Top Movies
      </button>
    </>
  )

  let content
  if(keyWord === null) {
    content = <SearchHighlights topShows={topShows} topMovies={topMovies} popShows={popularShows} popMovies={popularMovies} />
  } else if(keyWord === 1) {
    content = <ItemsByGenre data={popularShows} page={page} setPage={setPage}/>
  } else if(keyWord === 2) {
    content = <ItemsByGenre data={popularMovies} page={page} setPage={setPage}/>
  } else if(keyWord === 3) {
    content = <ItemsByGenre data={topShows} page={page} setPage={setPage}/>
  } else if(keyWord === 4) {
    content = <ItemsByGenre data={topMovies} page={page} setPage={setPage}/>
  } else if(keyWord === 'search') {
    // let items = searchList?.data?.results.map((item) => <h3 style={{marginBlock: '20px'}}>{item.name}</h3>)
    // content = (
    //   <div className='highlights-wrapper genres-wrapper'>
    //     {items}
    //   </div>
    // )
    content =  <ItemsByGenre data={searchList} page={1} setPage={setPage}/>
  }


  return (
    <div className="search-wrapper">
      <div className="search-input-wrapper">
        <input 
          value={search} 
          onChange={(e) => setSearch(e.target.value)} 
          type="text"
          placeholder="What are you looking for?"
          className="my-input search-input"  
        />
        {
         (keyWord === null || keyWord === 'search')
          ?
          <i className="fa-solid fa-magnifying-glass"></i>
          :
          <i onClick={() => setKeyWord(null)} style={{cursor: 'pointer'}} className="fa-solid fa-chevron-left"></i>
        }
      </div>

      <div className='keywords-wrapper'>
        <div className='keywords-mains'>
          { buttonsMain }
        </div>
      </div>

      { content }
    </div>
  )
}

export default SearchPage