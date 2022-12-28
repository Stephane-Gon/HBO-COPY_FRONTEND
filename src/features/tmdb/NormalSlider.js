import Slider from "react-slick";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "../../slick.css"; 
import "../../slick-theme.css";

import { selectConfig } from "./tmdbSlice";
import { selectUser } from "../auth/authSlice";
import { setNotification } from "../notifications/notificationSlice";

import SpinningLoader from "../../components/SpinningLoader";
import AddBtn from "./AddBtn";

const NormalSlider = ( props ) => {
  const dispatch = useDispatch()
  const config = useSelector(selectConfig)
  const user = useSelector(selectUser)

  const { 
    data, 
    sToShow, 
    title,
    isRate = false,
    isMovie = true
  } = props

  const {
    data: values,
    isLoading,
    isSuccess,
    isError
  } = data
  
  if(isError) {
    dispatch(setNotification({status: 404, message: "Could not retrieve all the data!"}))
  }
 

  let settings = {}
  let imgSize = ''
  let imgStyle = {}
  if (sToShow === 7) {
    settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 7,
      slidesToScroll: 7,
    }
    imgSize = `${config?.poster_sizes[2]}`
  } else if(sToShow === 5) {
    settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 5,
    }
    imgSize = `${config?.poster_sizes[3]}`
    imgStyle = {width: "280px"}
  }

  let items = []
  items = values?.results.map((item, i) => {
    let ratting = i + 1
    return (
      <div key={item.id} className="slider-item" >
        {
          isRate && <span className="slider-item-ratting">{ratting}#</span>
        }
        <div className="slider-img-holder">
          <img 
            style={{...imgStyle}}
            className="slider-img"
            src={`${config?.base_url}/${imgSize}/${item.poster_path}`} 
            alt={isMovie ? item.original_name : item.original_title}
          />
        </div>
        <div className="slider-actions">
          <Link to={`/tmdb/${isMovie ? 'movie' : 'show'}/${item.id}`}>
            <i className="fa-solid fa-info"></i>
          </Link>
          
          { user && <AddBtn data={item} type={isMovie ? 'movie' : 'show'} /> }
        </div>
      </div>
    )
  })

  return (
    <div>
      {
        isLoading 
        ? <SpinningLoader />
        : isSuccess 
        && (
          <>
            <h3 className="sec-heading normal-slider-heading" >
              {title}
            </h3>
            <Slider {...settings} className="slider-normal">
              { items }
            </Slider>
          </>
        )
      }
    </div>
  )

}

export default NormalSlider