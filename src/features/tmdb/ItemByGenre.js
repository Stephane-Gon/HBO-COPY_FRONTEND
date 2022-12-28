import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { selectConfig } from "./tmdbSlice";
import { selectUser } from '../auth/authSlice';
import { setNotification } from "../notifications/notificationSlice";

import SpinningLoader from "../../components/SpinningLoader";
import Pagination from "../../components/Pagination";
import AddBtn from "./AddBtn";

const ItemsByGenre = ({ data, page, setPage, isMovie=true }) => {
  const dispatch = useDispatch()
  const config = useSelector(selectConfig)
  const user = useSelector(selectUser)
  const {
    data: items,
    isLoading,
    isSuccess,
    isError
  } = data
  if(isError) {
    dispatch(setNotification({status: 404, message: "Could not retrieve all the data!"}))
  }

  let content = items?.results.map((item) => {
    if(item?.known_for_department) {
      return(
        <div key={item.id} className="slider-item" >
          <div className="slider-img-holder">
            <img 
              className="slider-img"
              style={{width: "280px"}}
              src={`${config?.base_url}/${config?.profile_sizes[3]}/${item.profile_path}`} 
              alt={item.name}
            />
          </div>
          <h2 className="slider-name">{item.name}</h2>
        </div>
      )
    }
    return (
      <div key={item.id} className="slider-item" >
        <div className="slider-img-holder">
          <img 
            className="slider-img"
            style={{width: "280px"}}
            src={`${config?.base_url}/${config?.poster_sizes[3]}/${item.poster_path}`} 
            alt={isMovie ? item.title : item.original_name}
          />
        </div>
        <div className="slider-actions">
          <Link to={`/tmdb/${isMovie ? 'movie' : 'show'}/${item.id}`}>
            <i className="fa-solid fa-info"></i>
          </Link>
          {
            user && <AddBtn data={item} type={isMovie ? 'movie' : 'show'} />
          }
        </div>
      </div>
    )
  })

  return (
    <>
      { 
        isLoading 
        ? <SpinningLoader /> 
        : isSuccess && (
          <div className='highlights-wrapper genres-wrapper'>
            { content } 
            
            <Pagination page={page} total_pages={items.total_pages} setPage={setPage}/>
          </div>
        )
      }
    </>
  )
}

export default ItemsByGenre