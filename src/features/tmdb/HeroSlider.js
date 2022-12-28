import Slider from "react-slick";
import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import "../../slick.css"; 
import "../../slick-theme.css";

import { setNotification } from "../notifications/notificationSlice";
import { selectConfig, selectMovieGenres, selectShowGenres } from "./tmdbSlice";

import SpinningLoader from "../../components/SpinningLoader";

const HeroSlider = ({ data, isMovie=true }) => {
  const dispatch = useDispatch()
  const config = useSelector(selectConfig)
  const movies_genres = useSelector(selectMovieGenres)
  const shows_genres = useSelector(selectShowGenres)

  const {
    data: values,
    isLoading,
    isSuccess,
    isError
  } = data

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000
  }

  let items = []
  if(isSuccess) {
    let itemsArray = values?.results.slice(0, 8)
    items = itemsArray.map((item) => {
      let genres
      if(isMovie){
        genres = movies_genres.genres.filter((genre) => item.genre_ids.includes(genre.id)).map((genre) => `${genre.name} `)
      } else {
        genres = shows_genres.genres.filter((genre) => item.genre_ids.includes(genre.id)).map((genre) => `${genre.name} `)
      }
      
      let slicedOverview = item.overview.split(' ').slice(0, 8).join(' ')
      return (
        <div key={item.id} className="slider-hero-item" >
          <img 
            className="slider-hero-img"
            src={`${config?.base_url}/${config?.backdrop_sizes[2]}/${item.backdrop_path}`} 
            alt={item.original_title}
          />
          <div className="slider-hero-info">
            <h1 className="my-heading">{item.original_title}</h1>
            <h3>{genres}</h3>
            <p>{slicedOverview}...</p>
            <Link to={`/tmdb/${isMovie ? 'movie' : 'show'}/${item.id}`}>
              <button className="my-btn" style={{marginTop: '30px'}}>More Info</button>
            </Link>
          </div>
        </div>
      )
    })
  } else if(isError) {
    dispatch(setNotification({status: 404, message: "Could not retrieve all the data!"}))
  }

  return (

    <div>
      {
        isLoading 
        ? <SpinningLoader />
        : isSuccess 
        && (
          <Slider {...settings} className="slider-hero">
            { items }
          </Slider>  
        )
      }
    </div>

  )
}

export default HeroSlider