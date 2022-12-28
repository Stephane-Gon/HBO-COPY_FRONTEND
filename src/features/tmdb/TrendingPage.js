import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { useGetTrendingQuery } from "../tmdbShows/showsApiSlice";
import { setNotification } from "../notifications/notificationSlice";
import { selectConfig } from "./tmdbSlice";
import { selectUser } from "../auth/authSlice";

import SpinningLoader from "../../components/SpinningLoader";
import AddBtn from "./AddBtn";

const TrendingPage = () => {
  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  const config = useSelector(selectConfig)
  const [media, setMedia] = useState("tv")
  const {
    data,
    isLoading,
    isSuccess,
    isError
  } = useGetTrendingQuery({ media })

  if(isError) return dispatch(setNotification({ status: 400, message: "Could not get Trending data!"}))

  let content = data?.results.map((item, i) => {
    return (
      <div key={i} className="slider-item" >
        <div className="slider-img-holder">
          <img 
            className="slider-img"
            style={{width: "280px"}}
            src={`${config?.base_url}/${config?.poster_sizes[3]}/${item.poster_path}`} 
            alt={media === "movie" ? item.title : item.original_name}
          />
        </div>
        <div className="slider-actions">
          <Link to={`/tmdb/${media === "movie" ? 'movie' : 'show'}/${item.id}`}>
            <i className="fa-solid fa-info"></i>
          </Link>
          { user && <AddBtn data={item} type={media === 'movie' ? 'movie' : 'show'}/> }
        </div>
      </div>
    )
  })

  return (
    <div className="trending-wrapper">
      <div className='keywords-wrapper'>
        <button 
          value="tv" 
          className={`my-btn ${media === "tv" ? "active" : ""}`}
          onClick={(e) => setMedia(e.target.value)}
        >
          Show
        </button>
        <button 
          value="movie" 
          className={`my-btn ${media === "movie" ? "active" : ""}`}
          onClick={(e) => setMedia(e.target.value)}
        >
          Movie
        </button>
      </div>
      <div className='highlights-wrapper genres-wrapper'>
        { 
          isLoading ? (
            <SpinningLoader />
          ) : isSuccess && (
            content
          )
        } 
      </div>
    </div>
  )
}

export default TrendingPage