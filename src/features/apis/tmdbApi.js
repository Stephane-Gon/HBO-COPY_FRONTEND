import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const token = process.env.REACT_APP_TMDB_TOKEN

const baseQuery = fetchBaseQuery({
  baseUrl : 'https://api.themoviedb.org/3/',
  // credentials: 'include',
  prepareHeaders: (headers) => {
    if(token) {
      headers.set("Authorization", `Bearer ${token}`)
      headers.set('Content-Type', 'application/json;charset=utf-8')
    }
    return headers
  }
})


export const tmdbApiSlice = createApi({
  reducerPath: 'tmdbApi',
  baseQuery,
  tagTypes: ['Movie', 'Show', 'Person', 'Season', 'Episode', 'Trending'],
  endpoints: builder => ({})
})