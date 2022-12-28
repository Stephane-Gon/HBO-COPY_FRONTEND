import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { setNotification } from "../notifications/notificationSlice";
import { selectConfig } from "../tmdb/tmdbSlice";

import SpinningLoader from "../../components/SpinningLoader";


const EpisodesDisplay = ({ data, showId }) => {
  const dispatch = useDispatch()
  const config = useSelector(selectConfig)
  const {
    data: values,
    isLoading,
    isSuccess,
    isError
  } = data

  if(isError) return dispatch(setNotification({ status: 400, message:"Could not retrieve list of episodes!"}))

  let items = []
  items = values?.episodes.map((item) => {
    return (
      <div key={item.id} className="episode" >
        <Link to={`/tmdb/show/${showId}/season/${values.season_number}/episode/${item.episode_number}`}>
          <img 
            className="episode-img"
            src={`${config?.base_url}/${config?.still_sizes[2]}/${item.still_path}`} 
            alt={item.original_title}
          />
        </Link>
        
        <div className="episode-info">
          <h4>{item.episode_number}. {item.name} </h4>
          <p>{item.runtime} MIN</p>
        </div>
        
      </div>
    )
  })

  return (
    <>
      {
        isLoading 
        ? <SpinningLoader />
        : isSuccess 
        && (
          <div className="episodes-wrapper">
            { items }
          </div>
        )
      }
    </>
  )
}

export default EpisodesDisplay