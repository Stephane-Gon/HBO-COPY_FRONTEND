import { Link } from "react-router-dom";
import Slider from "react-slick";
import { useSelector } from "react-redux";

import { selectConfig } from "./tmdbSlice";


const FavoriteSlider = ({ items }) => {
  const config = useSelector(selectConfig)

  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
  }

  let favs = []
  favs = items?.map((fav) => {
    return (
      <div key={fav.id} className="fav-item slider-item">
        <div className="slider-img-holder">
          <img 
            style={{width: "280px"}}
            className="slider-img"
            src={`${config?.base_url}/${fav.type === 'episode' ? config?.still_sizes[3] : config?.poster_sizes[3]}/${fav.img}`} 
            alt={fav.name}
          />
        </div>
        <div className="slider-actions">
          <Link
            to={
              fav.type === 'episode' ? 
                `/tmdb/show/${fav.showId}/season/${fav.seasonN}/episode/${fav.epN}`
              :
                `/tmdb/${fav.type === 'movie' ? 'movie' : 'show'}/${fav.id}`
            } 
          >
            <i className="fa-solid fa-info"></i>
          </Link>
        </div>
        <h3>{fav.name}</h3>
      </div>
    )
  })

  return (
    <div>
      <Link to="/auth/mypage/profile/favorites" className="sec-heading normal-slider-heading" >
        Your favorites
      </Link>
      <Slider {...settings} className="slider-normal">
        { favs }
      </Slider>
    </div>
  )
}

export default FavoriteSlider