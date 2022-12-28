import { tmdbApiSlice } from "../apis/tmdbApi"
import { setShowGenres } from "../tmdb/tmdbSlice"
import { setNotification } from "../notifications/notificationSlice"


const showsApiSlice = tmdbApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getShowGenres: builder.query({
      query: () => '/genre/tv/list',
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(setShowGenres({ genres: data }))

        } catch (err) {
          dispatch(setNotification({
            status: err.error.status,
            message: err.error.data.message
          }))
        }
      }
    }),
    getPopularShows: builder.query({
      query: ({ page=1 }) => `/tv/popular?page=${page}`,
      providesTags: ({ results }) => [
        {type: 'Show', id: 'LIST'},
        ...results.map((item) => ({ type: 'Show', id: item.id }))
      ]
    }),
    getTopShows: builder.query({
      query: ({ page=1 }) => `/tv/top_rated?page=${page}`,
      providesTags: ({ results }) => [
        {type: 'Show', id: 'LIST'},
        ...results.map((item) => ({ type: 'Show', id: item.id }))
      ]
    }),
    getAiringToday: builder.query({
      query: ({ page=1 }) => `/tv/airing_today?page=${page}`,
      providesTags: ({ results }) => [
        {type: 'Show', id: 'LIST'},
        ...results.map((item) => ({ type: 'Show', id: item.id }))
      ]
    }),
    getOnAir: builder.query({
      query: ({ page = 1 }) => `/tv/on_the_air?page=${page}`,
      providesTags: ({ results }) => [
        {type: 'Show', id: 'LIST'},
        ...results.map((item) => ({ type: 'Show', id: item.id }))
      ]
    }),
    getShowByGenre: builder.query({
      query: (arg) => `/discover/tv?sort_by=popularity.desc&page=${arg.page}&with_genres=${arg.genre}`,
      providesTags: ({ results }) => [
        { type: 'Show', id: 'LIST' },
        ...results.map((item) => ({ type: 'Show', id: item.id }))
      ]
    }),
    getShow: builder.query({
      query: ({ id }) => `/tv/${id}`,
      providesTags: ({ id }) => [
        { type: 'Show', id: 'LIST' },
        ({ type: 'Show', id })
      ]
    }),
    getSimilarShow: builder.query({
      query: ({ id }) => `/tv/${id}/similar`,
      providesTags: ({ results }) => [
        { type: 'Show', id: 'LIST' },
        ...results.map((item) => ({ type: 'Show', id: item.id }))
      ]
    }),
    getSeason: builder.query({
      query: ({ season, id }) => `/tv/${id}/season/${season}`,
      providesTags: ({ id }) => [
        { type: 'Show', id: 'LIST' },
        ({ type: 'Show', id })
      ]
    }),
    getEpisode: builder.query({
      query: ({ showId, season, ep }) => `/tv/${showId}/season/${season}/episode/${ep}`,
      providesTags: ({ id }) => [
        { type: 'Episode', id: 'LIST' },
        ({ type: 'Episode', id })
      ]
    }),
    getEpCredits: builder.query({
      query: ({showId, season, ep}) => `/tv/${showId}/season/${season}/episode/${ep}/credits`
    }),
    getTrending: builder.query({
      query: ({ media }) => `/trending/${media}/week`,
      providesTags: ({ results }) => [
        { type: 'Trending', id: 'LIST' },
        ...results.map((item) => ({ type: 'Trending', id: item.id }))
      ]
    }),
   
  })
})


export const { 
  useGetShowGenresQuery,
  useGetPopularShowsQuery,
  useGetTopShowsQuery,
  useGetAiringTodayQuery,
  useGetOnAirQuery,
  useGetShowByGenreQuery,
  useGetShowQuery,
  useGetSimilarShowQuery,
  useGetSeasonQuery,
  useGetEpisodeQuery,
  useGetEpCreditsQuery,
  useGetTrendingQuery
} = showsApiSlice