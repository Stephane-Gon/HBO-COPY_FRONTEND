import Slider from "react-slick";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "../../slick.css"; 
import "../../slick-theme.css";

import { selectConfig } from "./tmdbSlice";
import { selectUser } from "../auth/authSlice";
import { setNotification } from "../notifications/notificationSlice";

import SpinningLoader from "../../components/SpinningLoader";


const SecSlider = (props) => {
  const dispatch = useDispatch()
  const config = useSelector(selectConfig)
  const user = useSelector(selectUser)

  const { 
    showsData = {},
    moviesData = {}, 
  } = props

  const {
    data: sValues,
    isLoading: isSLoading,
    isSuccess: isSSuccess,
    isError: isSError
  } = showsData

  const {
    data: mValues,
    isLoading: isMLoading,
    isSuccess: isMSuccess,
    isError: isMError
  } = moviesData
  
  if(isSError || isMError) {
    dispatch(setNotification({status: 404, message: "Could not retrieve all the data!"}))
  }
 

  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  }
  
  let items = []
  let movieItems = []
  let showItems = []
  if(sValues?.results.length !== 0 && isSSuccess) {
    showItems = sValues?.results.map((item, i) => {
      return (
        <div key={item.id + i} className="slider-item landscape" >
          <div className="slider-img-holder">
            <img 
              className="slider-img"
              src={`${config?.base_url}/${config?.backdrop_sizes[1]}/${item.backdrop_path}`} 
              alt={item.original_name}
            />
          </div>
          
          <div className="slider-actions">
            <Link to={`/tmdb/show/${item.id}`}>
              <i className="fa-solid fa-info"></i>
            </Link>
          </div>

          <h3>{item.name}</h3>
        </div>
      )
    })
  }

  if(mValues?.results.length !== 0 && isMSuccess) {
    movieItems = mValues?.results.map((item, i) => {
      return (
        <div key={item.id + i} className="slider-item landscape" >
          <div className="slider-img-holder">
            <img 
              className="slider-img"
              src={`${config?.base_url}/${config?.backdrop_sizes[1]}/${item.backdrop_path}`} 
              alt={item.original_title}
            />
          </div>

          <div className="slider-actions">
            <Link to={`/tmdb/movie/${item.id}`}>
              <i className="fa-solid fa-info"></i>
            </Link>
          </div>

          <h3>{item.original_title}</h3>
        </div>
      )
    })
  }  
  
  items.push(...showItems.slice(0, 6))
  items.push(...movieItems.slice(0, 6))

  return (
    <div>
      {
        isSLoading && isMLoading
        ? <SpinningLoader />
        : isSSuccess  && isMSuccess
        && (
          <Slider {...settings} className="slider-normal">
            { items }
          </Slider>
        )
      }
    </div>
  )
}

export default SecSlider