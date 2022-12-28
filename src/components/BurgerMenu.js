import { Link } from "react-router-dom"
import { forwardRef, useState, useEffect, useRef } from "react"

const BurgerMenu = forwardRef(({ setSide }, ref) => {
  const refGenres = useRef(null)
  const [genresMenu, setGenresMenu] = useState(false)

  //* EFFECT QUE LIDA COM A LÓGICA DO GENRES MENU
  useEffect(() => {
    if(refGenres.current.classList.contains('active-genres')) {
      refGenres.current.className = 'burger-menu genres-menu '
    }
    else {
      refGenres.current.className = 'burger-menu genres-menu active-genres'
    }

    const getTarget = (e) => {
      if(!e.target.dataset['genre']) setGenresMenu(false)
    }
    if(genresMenu) {
      window.addEventListener('click', getTarget)
    }
    return () =>  window.removeEventListener('click', getTarget)

  }, [genresMenu])

  return (
    <>
      <div ref={ref} className="burger-menu" data-burger={true} data-genre={true}>
        <i onClick={() => setSide((prevState) => !prevState)} className="fa-solid fa-xmark"></i>
        <Link to="/">Home</Link>
        <Link to="/tmdb/movies">Movies</Link>
        <Link to="/tmdb/shows">Shows</Link>
        <Link to="/tmdb/trending">Trending</Link>
        <hr/>
        <div data-burger={true} data-genre={true} className="special" onClick={() => setGenresMenu((prevState) => !prevState)}>
          Genres
          <i className="fa-solid fa-chevron-right"></i>
        </div>
          
        <hr/>
      </div>
      <div data-burger={true} className="burger-menu genres-menu" ref={refGenres}>
        <Link to="/tmdb/genre/action/28">Action</Link>
        <Link to="/tmdb/genre/adventure/12">Adventure</Link>
        <Link to="/tmdb/genre/animation/16">Animation</Link>
        <Link to="/tmdb/genre/comedy/35">Comedy</Link>
        <Link to="/tmdb/genre/crime/80">Crime</Link>
        <Link to="/tmdb/genre/documentary/99">Documentary</Link>
        <Link to="/tmdb/genre/drama/18">Drama</Link>
        <Link to="/tmdb/genre/mistery/9648">Mistery</Link>
        <Link to="/tmdb/genre/fantasy/14">Fantasy</Link>
        <Link to="/tmdb/genre/science&fiction/878">Science Fiction</Link>
        <Link to="/tmdb/genre/action&adventure/10759">Action & Adventure</Link>
        <Link to="/tmdb/genre/sci-fi&fantasy/10765">Sci-Fi & Fantasy</Link>

      </div>

    </>
    
  )
})

export default BurgerMenu