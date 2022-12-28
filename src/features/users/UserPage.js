import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetAllUsersQuery } from './usersApiSlice';

import SpinningLoader from '../../components/SpinningLoader';

const UserPage = () => {
  let { userId } = useParams()
  const {
    user,
    isLoading: userIsLoading,
    isSuccess: userIsSuccess,
    isError: userIsError,
    error: userError
  } = useGetAllUsersQuery('getUsers', {
    selectFromResult: ({data, isLoading, isSuccess, isError, error}) => ({
      user: data?.entities[userId],
      isLoading,
      isSuccess,
      isError,
      error
    })
  })

  let content
  if(userIsLoading) content = <SpinningLoader />
  else if(userIsSuccess) {
    content = (
      <div className='users-list-main'>
        <h1 className='my-heading'>User Details Page</h1>
        <div className='users-wrapper'>
          <div className='users-wrapper-blur'></div>
          <div className='user-wrapper'>
            <h2 className='sec-heading'><b>Id:</b> {userId}</h2>
            <h2 className='sec-heading'><b>Name:</b> {`${user?.firstName} ${user?.lastName}`}</h2>
            <h2 className='sec-heading'><b>Email:</b> {user?.email}</h2>
            {
              user?.createdAt && (
                <h2 className='sec-heading'><b>Created At:</b> {user?.createdAt}</h2>
              )
            }
          </div>
        </div>
      </div>
    )
  } else if(userIsError) {
    content = <h2 className='sec-heading'>{userError}</h2>
  }

  return (
    <>
      {content}
    </>
  )
}

export default UserPage