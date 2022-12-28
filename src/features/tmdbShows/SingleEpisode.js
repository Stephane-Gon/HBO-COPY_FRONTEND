import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';

import { useGetEpisodeQuery, useGetEpCreditsQuery } from "./showsApiSlice";
import { selectConfig } from "../tmdb/tmdbSlice";
import { selectUser } from "../auth/authSlice";
import { setNotification } from "../notifications/notificationSlice";

import SpinningLoader from "../../components/SpinningLoader";
import Cast from "../tmdb/Cast";
import AddBtn from "../tmdb/AddBtn";

const SingleEpisode = () => {
  const dispatch = useDispatch()
  const params = useParams()
  const config = useSelector(selectConfig)
  const user = useSelector(selectUser)
  const episodeCredits = useGetEpCreditsQuery({ showId: params.showId, season: params.season, ep: params.ep })
  const { 
    data,
    isLoading,
    isSuccess,
    isError
  } = useGetEpisodeQuery({ showId: params.showId, season: params.season, ep: params.ep })

  if(isError) dispatch(setNotification({ status: 400, message: 'Could not display this Item!'}))

  let content
  if(isLoading) {
    content = <SpinningLoader />
  } else if(isSuccess) {
    content = (
      <>
        <div className="item-top-half">
          <img 
            className="item-img"
            src={`${config?.base_url}/${config?.still_sizes[3]}/${data.still_path}`} 
            alt={data.name}
          />
          <span className="item-info">
            <h1 className="my-heading">{data.name}</h1>
            <span>
              <p>
                {data.runtime} MIN
              </p>
              <p>
                For Adults: {data.adult ? 'Yes' : 'No'}
              </p>
              <p>
                {data.air_date}
              </p>
              <p>
                Rating: {data.vote_average}
              </p>
              <p>
                Nº of votes: {data.vote_count}
              </p>
            </span>
            { user && <AddBtn data={data} type="episode" showId={params.showId} /> }
            <p className="item-desc">{data.overview}</p>

            <Link className="episodes-link" to={`/tmdb/show/${params.showId}`}> 
              <i className="fa-solid fa-layer-group"></i>
              MORE EPISODES 
            </Link>

          </span>
        </div>
        <div className="item-bot-half">
          <Cast data={episodeCredits} />
        </div>
      </>
      
    )
  }


  return (
    <div className="single-item">
      { content }
    </div>
    
  )
}

export default SingleEpisode