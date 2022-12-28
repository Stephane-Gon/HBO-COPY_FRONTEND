import { apiSlice } from "../apis/api";
import { setPersona, setIsPin, setCredentials } from "../auth/authSlice";
import { setNotification } from "../notifications/notificationSlice";


const profileApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    addProfile: builder.mutation({
      query: (arg)=> ({
        url: '/profile/add',
        method: 'POST',
        body: {
          name: arg.name,
          isChild: arg.isChild,
          age: Number(arg.age),
          _id: arg._id
        }
      }),
      async onQueryStarted(arg, {dispatch, getState, queryFulfilled}) {
        try {
          const { data } = await queryFulfilled
          const access_token = await getState().auth.access_token
          const new_persona = data.user.persona.find((person) => person.name === arg.name)

          dispatch(setCredentials({ user: data.user, access_token }))
          dispatch(setIsPin({ isPin: false }))
          dispatch(setPersona({ persona: new_persona }))
          dispatch(setNotification({ status: 200, message: data.message }))

          arg.navigate('/auth/profile/manage')

        } catch(err) {
          dispatch(setNotification({
            status: err.error.status,
            message: err.error.data.message
          }))
        }
      },
      invalidatesTags: (result, error, arg) => [
        {type: 'User', id: arg._id}
      ]
    }),
    addPin: builder.mutation({
      query: (arg)=> ({
        url: '/profile/pin/add',
        method: 'POST',
        body: {
          pin: arg.pin,
          _id: arg._id
        }
      }),
      async onQueryStarted(arg, {dispatch, getState, queryFulfilled}) {
        try {
          const { data } = await queryFulfilled
          const access_token = await getState().auth.access_token
          dispatch(setCredentials({ user: data.user, access_token }))
          dispatch(setNotification({ status: 200, message: data.message }))
        } catch(err) {
          dispatch(setNotification({
            status: err.error.status,
            message: err.error.data.message
          }))
        }
      },
      invalidatesTags: (result, error, arg) => [
        {type: 'User', id: arg._id}
      ]
    }),
    checkPin: builder.mutation({
      query: (arg) => ({
        url: '/profile/pin/check',
        method: 'POST',
        body: {
          pin: arg.pin,
          _id: arg._id
        }
      }),
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        try {
          const { data } = await queryFulfilled
          dispatch(setNotification({ status: 200, message: data.message }))
        } catch(err) {
          dispatch(setNotification({
            status: err.error.status,
            message: err.error.data.message
          }))
        }
      }
    }),
    updateProfile: builder.mutation({
      query: (arg) => ({
        url: `/profile/update/${arg.personaId}`,
        method: 'PUT',
        body: {
          name: arg.name,
          age: Number(arg.age),
          ageRestriction: Number(arg.ageRestriction),
        }
      }),
      async onQueryStarted(arg, {dispatch, getState, queryFulfilled}) {
        try {
          const { data } = await queryFulfilled
          const access_token = await getState().auth.access_token
          const currentPersona = await getState().auth.persona
          if (currentPersona._id === arg.personaId) {
            const new_persona = data.user.persona.find((person) => person._id === arg.personaId)
            dispatch(setPersona({ persona: new_persona }))
          }

          dispatch(setCredentials({ user: data.user, access_token }))
          dispatch(setIsPin({ isPin: false }))
          dispatch(setNotification({ status: 200, message: data.message }))

          arg.navigate('/auth/profile/manage')

        } catch(err) {
          dispatch(setNotification({
            status: err.error.status,
            message: err.error.data.message
          }))
        }
      },
      invalidatesTags: (result, error, arg) => [
        {type: 'User', id: arg.userId}
      ]
    }),
    deleteProfile: builder.mutation({
      query: (arg) => ({
        url: `/profile/delete/${arg.personaId}`,
        method: 'DELETE',
        body: {}
      }),
      async onQueryStarted(arg, {dispatch, getState, queryFulfilled}) {
        try {
          const { data } = await queryFulfilled
          const access_token = await getState().auth.access_token
          const currentPersona = await getState().auth.persona
          if (currentPersona._id === arg.personaId) {
            dispatch(setPersona({ persona: data.user.persona[0] }))
          }

          dispatch(setCredentials({ user: data.user, access_token }))
          dispatch(setIsPin({ isPin: false }))
          dispatch(setNotification({ status: 200, message: data.message }))
          arg.navigate('/auth/profile/manage')

        } catch(err) {
          dispatch(setNotification({
            status: err.error.status,
            message: err.error.data.message
          }))
        }
      },
      invalidatesTags: (result, error, arg) => [
        {type: 'User', id: arg.userId}
      ]
    }),
    replacePin: builder.mutation({
      query: (arg)=> ({
        url: '/profile/pin/replace',
        method: 'PUT',
        body: {
          oldPin: arg.oldPin,
          newPin: arg.newPin,
          _id: arg._id
        }
      }),
      async onQueryStarted(arg, {dispatch, getState, queryFulfilled}) {
        try {
          const { data } = await queryFulfilled
          const access_token = await getState().auth.access_token
          dispatch(setCredentials({ user: data.user, access_token }))
          dispatch(setNotification({ status: 200, message: data.message }))
        } catch(err) {
          dispatch(setNotification({
            status: err.error.status,
            message: err.error.data.message
          }))
        }
      },
      invalidatesTags: (result, error, arg) => [
        {type: 'User', id: arg._id}
      ]
    })
  })
})

export const {
  useAddPinMutation,
  useCheckPinMutation,
  useAddProfileMutation,
  useUpdateProfileMutation,
  useDeleteProfileMutation,
  useReplacePinMutation
} = profileApiSlice