import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null, 
  access_token: null, 
  persona: null,
  isPin: false
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, access_token } = action.payload
      
      state.user = user
      state.access_token = access_token
    },
    logOut: (state, action) => {
      state.user = null
      state.access_token = null
      state.persona = null
      state.isPin = false
    },
    setPersona: (state, action) => {
      const { persona } = action.payload
      state.persona = persona
    },
    setIsPin: (state, action) => {
      const { isPin } = action.payload
      state.isPin = isPin
    }
  }
})


export const { setCredentials, logOut, setPersona, setIsPin } = authSlice.actions

export default authSlice.reducer

export const selectUser = (state) => state.auth.user
export const selectToken = (state) => state.auth.access_token
export const selectPersona = (state) => state.auth.persona
export const selectPin = (state) => state.auth.isPin

