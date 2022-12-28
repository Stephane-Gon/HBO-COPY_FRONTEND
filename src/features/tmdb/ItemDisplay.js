import React from 'react'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { selectUser } from '../auth/authSlice';
import { selectConfig } from './tmdbSlice';

import { setNotification } from '../notifications/notificationSlice';

import AddBtn from './AddBtn';
import SpinningLoader from '../../components/SpinningLoader';

const ItemDisplay = ({ title, data, isMovie }) => {
  const config = useSelector(selectConfig)
  const user = useSelector(selectUser)
  const dispatch = useDispatch()

  const {
    data: values,
    isLoading,
    isSuccess,
    isError
  } = data
  if(isError) {
    dispatch(setNotification({status: 404, message: "Could not retrieve all the data!"}))
  }

  let item = values?.results[9]

  return (
    <div>
      {
        isLoading 
        ? <SpinningLoader />
        : isSuccess 
        && (
          <div className='item-display'>
            <div className='item-info'>
              <h1 className='my-heading'>{title}</h1>
              
              <div>
                {
                  isMovie ? (
                    <h2 className='sec-heading'>{item.title}</h2>
                  ) : (
                    <h2 className='sec-heading'>{item.original_name}</h2>
                  )
                }
                
                <p>{item.overview}</p>
        
                <div className='item-actions'>
                  { 
                    user && (
                      <div className='item-icon'>
                        <AddBtn data={values?.results[9]} type={isMovie ? 'movie' : 'show'} />
                      </div>
                    ) 
                  }
                  <Link to={`/tmdb/${isMovie ? 'movie' : 'show'}/${item.id}`}>
                    <button className='my-btn'>More Info</button>
                  </Link>
                </div>
              </div>
            </div>
            <img 
              className="item-img"
              src={`${config?.base_url}/${config?.backdrop_sizes[1]}/${item.backdrop_path}`} 
              alt={item.original_title}
            />
          </div>
        )
      }
    </div>
  )
}

export default ItemDisplay