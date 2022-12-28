import Slider from "react-slick";
import { useSelector, useDispatch } from "react-redux";
import "../../slick.css"; 
import "../../slick-theme.css";

import { selectConfig } from "./tmdbSlice";
import { setNotification } from "../notifications/notificationSlice";
import SpinningLoader from "../../components/SpinningLoader";

const PeopleSlider = ( props ) => {
  const dispatch = useDispatch()
  const config = useSelector(selectConfig)

  const { 
    data, 
    sToShow, 
    title
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
    imgSize = `${config?.profile_sizes[2]}`
  } else if(sToShow === 5) {
    settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 5,
    }
    imgSize = `${config?.profile_sizes[3]}`
    imgStyle = {width: '280px'}
  }
 

  let items = []
  items = values?.results.map((item) => {
    return (
      <div key={item.id} className="slider-item" >
        <div className="slider-img-holder">
          <img 
            style={{...imgStyle}}
            className="slider-img"
            src={`${config?.base_url}/${imgSize}/${item.profile_path}`} 
            alt={item.name}
          />
        </div>
        <h2 className="slider-name">{item.name}</h2>
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

export default PeopleSlider