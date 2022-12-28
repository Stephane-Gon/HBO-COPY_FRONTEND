import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  config: {},
  movies_genres: {},
  shows_genres: {}
}

const tmdbSlice = createSlice({
  name: 'tmdb',
  initialState,
  reducers: {
    setConfig: (state, action) => {
      const { config } = action.payload
      state.config = config.images
    },
    setMovieGenres: (state, action) => {
      const data = action.payload
      state.movies_genres = data.genres
    },
    setShowGenres: (state, action) => {
      const data = action.payload
      state.shows_genres = data.genres
    }
  }
})


export const { setConfig, setMovieGenres, setShowGenres } = tmdbSlice.actions

export default tmdbSlice.reducer

export const selectConfig = (state) => state.tmdb.config
export const selectMovieGenres = (state) => state.tmdb.movies_genres
export const selectShowGenres = (state) => state.tmdb.shows_genres


