import { tmdbApiSlice } from "../apis/tmdbApi"
import { setConfig, setMovieGenres } from "../tmdb/tmdbSlice"
import { setNotification } from "../notifications/notificationSlice"


const moviesApiSlice = tmdbApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getConfig: builder.query({
      query: () => '/configuration',
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(setConfig({ config: data }))

        } catch (err) {
          dispatch(setNotification({
            status: err.error.status,
            message: err.error.data.message
          }))
        }
      }
    }),
    getGenres: builder.query({
      query: () => '/genre/movie/list',
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(setMovieGenres({ genres: data }))

        } catch (err) {
          dispatch(setNotification({
            status: err.error.status,
            message: err.error.data.message
          }))
        }
      }
    }),
    getPopularMovies: builder.query({
      query: ({ page=1 }) => `/movie/popular?page=${page}`,
      providesTags: ({ results }) => [
        {type: 'Movie', id: 'LIST'},
        ...results.map((item) => ({type: 'Movie', id: item.id }))
      ]
    }),
    getNowMovies: builder.query({
      query: () => '/movie/now_playing',
      providesTags: ({ results }) => [
        {type: 'Movie', id: 'LIST'},
        ...results.map((item) => ({type: 'Movie', id: item.id }))
      ]
    }),
    getUpcomingMovies: builder.query({
      query: () => '/movie/upcoming',
      providesTags: ({ results }) => [
        {type: 'Movie', id: 'LIST'},
        ...results.map((item) => ({type: 'Movie', id: item.id }))
      ]
    }),
    getTopMovies: builder.query({
      query: ({ page = 1 }) => `/movie/top_rated?page=${page}`,
      providesTags: ({ results }) => [
        { type: 'Movie', id: 'LIST' },
        ...results.map((item) => ({ type: 'Movie', id: item.id }))
      ]
    }),
    getLastMovie: builder.query({
      query: () => '/movie/latest',
      providesTags: (item) => [
        { type: 'Movie', id: 'LIST' },
        { type: 'Movie', id: item.id }
      ]
    }),
    getPopPerson: builder.query({
      query: () => '/person/popular',
      providesTags: ({ results }) => [
        { type: 'Person', id: 'LIST' },
        ...results.map((item) => ({ type: 'Person', id: item.id }))
      ]
    }),
    getMovieByGenre: builder.query({
      query: (arg) => `/discover/movie?sort_by=popularity.desc&page=${arg.page}&with_genres=${arg.genre}`,
      providesTags: ({ results }) => [
        { type: 'Movie', id: 'LIST' },
        ...results.map((item) => ({ type: 'Movie', id: item.id }))
      ]
    }),
    getMovie: builder.query({
      query: ({ id }) => `/movie/${id}`,
      providesTags: ({ id }) => [
        { type: 'Movie', id: 'LIST' },
        ({ type: 'Movie', id })
      ]
    }),
    getCredits: builder.query({
      query: ({ id }) => `/movie/${id}/credits`
    }),
    getSimilar: builder.query({
      query: ({ id }) => `/movie/${id}/similar`,
      providesTags: ({ results }) => [
        { type: 'Movie', id: 'LIST' },
        ...results.map((item) => ({ type: 'Movie', id: item.id }))
      ]
    }),
    getSearch: builder.query({
      query: (arg) => `/search/multi?query=${arg.query}`,
    })
  })
})


export const { 
  useGetPopularMoviesQuery,
  useGetConfigQuery,
  useGetGenresQuery,
  useGetUpcomingMoviesQuery,
  useGetTopMoviesQuery,
  useGetLastMovieQuery,
  useGetPopPersonQuery,
  useGetMovieByGenreQuery,
  useGetNowMoviesQuery,
  useGetMovieQuery,
  useGetSimilarQuery,
  useGetCreditsQuery,
  useGetSearchQuery
} = moviesApiSlice