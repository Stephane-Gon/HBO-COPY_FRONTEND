import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCredentials, logOut } from '../auth/authSlice'


const baseQuery = fetchBaseQuery({
  baseUrl : 'http://localhost:3500',
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.access_token
    if(token) {
      console.log('Token enviado')
      headers.set("authorization", `Bearer ${token}`)
    }
    return headers
  }
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)

  if(result?.error?.originalStatus === 403) {

    const refreshResult = await baseQuery('/auth/refresh', api, extraOptions)

    if(refreshResult?.data) {
      api.dispatch(setCredentials({ ...refreshResult.data }))

      result = await baseQuery(args, api, extraOptions)
    } else {
      api.dispatch(logOut())
    }
  }
  return result
}

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ['User'],
  endpoints: builder => ({})
})