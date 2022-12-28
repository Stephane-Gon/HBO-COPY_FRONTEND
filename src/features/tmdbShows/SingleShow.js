import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { useGetShowQuery, useGetSimilarShowQuery } from "./showsApiSlice";
import { selectConfig } from "../tmdb/tmdbSlice";
import { selectUser } from "../auth/authSlice";
import { setNotification } from "../notifications/notificationSlice";

import SpinningLoader from "../../components/SpinningLoader";
import NormalSlider from "../tmdb/NormalSlider";
import ShowsSeasons from "./ShowsSeasons";
import AddBtn from "../tmdb/AddBtn";

const SingleShow = () => {
  const dispatch = useDispatch()
  const params = useParams()
  const config = useSelector(selectConfig)
  const user = useSelector(selectUser)
  const similarShows = useGetSimilarShowQuery({ id: params.id })
  const { 
    data,
    isLoading,
    isSuccess,
    isError
  } = useGetShowQuery({ id: params.id })

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
            src={`${config?.base_url}/${config?.backdrop_sizes[2]}/${data.backdrop_path}`} 
            alt={data.original_title}
          />
          <span className="item-info">
            <h1 className="my-heading">{data.original_title}</h1>
            <span>
              <p>
                Episodes: {data.number_of_episodes}
              </p>
              <p>
                For Adults: {data.adult ? 'Yes' : 'No'}
              </p>
              <p>
                {data.first_air_date.slice(0, 4)}
              </p>
              <p>
                Rating: {data.vote_average}
              </p>
              <p>
                Nº of votes: {data.vote_count}
              </p>
            </span>
            { user && <AddBtn data={data} type="show"/> }
            <p className="item-desc">{data.overview}</p>
          </span>
        </div>
        <div className="item-bot-half">
          <ShowsSeasons data={data} />
          <NormalSlider data={similarShows} sToShow={7} title="Similar Shows!" isMovie={false} />
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

export default SingleShow