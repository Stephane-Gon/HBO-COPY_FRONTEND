import React from 'react'
import { useGetAllUsersQuery } from './usersApiSlice';
import { Link } from 'react-router-dom';

import SpinningLoader from '../../components/SpinningLoader'

const UsersList = () => {
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetAllUsersQuery('getUsers')

  let content
  if(isLoading) {
    content = <SpinningLoader />
  } else if(isSuccess) {
    content = (
      <div className='users-list-main'>
        <h1 className='my-heading'>Users List</h1>
        <div className='users-wrapper'>
          <div className='users-wrapper-blur'></div>
          {
            users.ids.map((userId) => (
              <Link to={`/users/${userId}`} key={userId} className='user-wrapper'>
                <h2 className='sec-heading'><b>Id:</b> {userId}</h2>
                <h2 className='sec-heading'><b>Name:</b> {`${users.entities[userId]?.firstName} ${users.entities[userId]?.lastName}`}</h2>
                <h2 className='sec-heading'><b>Email:</b> {users.entities[userId]?.email}</h2>
                {
                  users.entities[userId]?.createdAt && (
                    <h2 className='sec-heading'><b>Created At:</b> {users.entities[userId]?.createdAt}</h2>
                  )
                }
                <hr></hr>
              </Link>
            ))
          }
        </div>
      </div>
    )
  } else if(isError) {
    content = <p>{error}</p>
  }

  return (
    <div>
      {content}
    </div>
  )
}

export default UsersList