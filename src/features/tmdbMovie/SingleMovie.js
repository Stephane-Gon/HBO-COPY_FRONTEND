import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { useGetMovieQuery, useGetSimilarQuery, useGetCreditsQuery } from "./moviesApiSlice";
import { selectConfig } from "../tmdb/tmdbSlice";
import { selectUser } from "../auth/authSlice";
import { setNotification } from "../notifications/notificationSlice";

import SpinningLoader from "../../components/SpinningLoader";
import NormalSlider from "../tmdb/NormalSlider";
import Cast from "../tmdb/Cast";
import AddBtn from "../tmdb/AddBtn";

const SingleMovie = () => {
  const dispatch = useDispatch()
  const params = useParams()
  const user = useSelector(selectUser)
  const config = useSelector(selectConfig)
  const similarMovies = useGetSimilarQuery({ id: params.id })
  const movieCredits = useGetCreditsQuery({ id: params.id })
  const { 
    data,
    isLoading,
    isSuccess,
    isError
  } = useGetMovieQuery({ id: params.id })

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
                {Math.floor(data.runtime / 60)}H. {data.runtime % 60}MIN
              </p>
              <p>
                For Adults: {data.adult ? 'Yes' : 'No'}
              </p>
              <p>
                {data.release_date.slice(0, 4)}
              </p>
              <p>
                Rating: {data.vote_average}
              </p>
              <p>
                Nº of votes: {data.vote_count}
              </p>
            </span>
            { user && <AddBtn data={data} type="movie" /> }
            <p className="item-desc">{data.overview}</p>
          </span>
        </div>
        <div className="item-bot-half">
          <NormalSlider data={similarMovies} sToShow={7} title="Similar Movies!" />

          <Cast data={movieCredits} />
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

export default SingleMovie