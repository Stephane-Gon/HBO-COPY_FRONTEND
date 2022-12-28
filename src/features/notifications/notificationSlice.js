import { createSlice } from "@reduxjs/toolkit";

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: {status: null, message: null},
  reducers: {
    setNotification: (state, action) => {
      const { status, message } = action.payload

      state.status = status
      state.message = message
    },
    clearNotification: (state, action) => {
      state.status = null
      state.message = null
    }
  }
})

export const { setNotification, clearNotification } = notificationsSlice.actions

export default notificationsSlice.reducer

export const selectMessage = (state) => state.notifications.message
export const selectStatus = (state) => state.notifications.status