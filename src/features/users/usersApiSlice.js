import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../apis/api";

const usersAdapter = createEntityAdapter({
  selectId: (user) => user._id,
  sortComparer: (a, b) => b.createdAt.localeCompare(a.createdAt)
})

const initialState = usersAdapter.getInitialState()

const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getAllUsers: builder.query({
      query: () => '/users',
      transformResponse: (resData) => {
        return usersAdapter.setAll(initialState, resData)
      },
      providesTags: (result) => [
        {type: 'User', id: 'LIST'},
        ...result.ids.map((id) => ({type: 'User', id }))
      ]
    })
  })
})

export const { useGetAllUsersQuery } = usersApiSlice

export const selectUsersResult = usersApiSlice.endpoints.getAllUsers.select()

const selectUsersData = createSelector(selectUsersResult, (usersResult) => usersResult.data)

export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUserIds
    // Pass in a selector that returns the users slice of state
} = usersAdapter.getSelectors(state => selectUsersData(state) ?? initialState)