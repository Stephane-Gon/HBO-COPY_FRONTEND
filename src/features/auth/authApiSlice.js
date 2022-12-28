import { apiSlice } from "../apis/api";
import { setCredentials, logOut, setPersona } from "./authSlice";
import { setNotification } from "../notifications/notificationSlice";

const authApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    signIn: builder.mutation({
      query: (arg) => ({
        url: '/auth/login',
        method: 'POST',
        body: {
          ...arg.formData,
        }
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(setCredentials({
            user: data.user,
            access_token: data.access_token
          }))
          dispatch(setPersona({
            persona: data.user.persona[0]
          }))
          dispatch(setNotification({
            status: 200, 
            message: data.message
          }))
          arg.navigate('/auth/profile/manage')
        } catch (err) {
          dispatch(setNotification({
            status: err.error.status, 
            message: err.error?.data?.message
          }))
        }
      }
    }),
    signUp: builder.mutation({
      query: (arg)=> ({
        url: '/auth/register',
        method: 'POST',
        body: {
          ...arg.formData,
          createdAt: new Date().toISOString(),
          age: Number(arg.formData.age)
        }
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(setCredentials(data))

          dispatch(setPersona({
            persona: data.user.persona[0]
          }))
          dispatch(setNotification({
            status: 200, 
            message: data.message
          }))

          arg.navigate('/auth/profile/manage')
        } catch (err) {
          dispatch(setNotification({
            status: err.error.status, 
            message: err.error.data.message
          }))
        }
      }
    }),
    signOut: builder.mutation({
      query: (arg) => ({
        url: '/auth/logout',
        method: 'GET',
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(logOut())
          
          dispatch(setNotification({
            status: 204, 
            message: data.message
          }))
          arg.navigate('/auth/login')
  
        } catch (err) {
          dispatch(setNotification({
            status: err.error.status, 
            message: err.error.data.message
          }))
        }
      }
    }),
    updateInfo: builder.mutation({
      query: (arg) => ({
        url: `/auth/update/${arg._id}`,
        method: 'PUT',
        body: {...arg}
      }),
      async onQueryStarted(arg, {dispatch, getState , queryFulfilled}) {
        try {
          const { data } = await queryFulfilled
          const access_token = await getState().auth.access_token

          dispatch(setCredentials({ user: data.user, access_token }))

          dispatch(setNotification({
            status: 200,
            message: data.message
          }))
        } catch (err) {
          dispatch(setNotification({
            status: err.error.status, 
            message: err.error.data.message
          }))
        }
      },
      invalidatesTags: (result, error, arg) => [
        {type: 'User', id: arg._id}
      ],
    }),
    deleteAccount: builder.mutation({
      query: (arg) => ({
        url: `/auth/delete/${arg._id}`,
        method: 'DELETE',
        body: {}
      }),
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        try {
          const { data } = await queryFulfilled

          dispatch(logOut())
          dispatch(setNotification({
            status: 200,
            message: data.message
          }))
          arg.navigate('/auth/login')
        } catch (err) {
          dispatch(setNotification({
            status: err.error.status, 
            message: err.error.data.message
          }))
        }
      },
      invalidatesTags: (result, error, arg) => [
        {type: 'Post', id: arg._id}
      ]
    }),
    addFavorite: builder.mutation({
      query: (arg) => ({
        url: '/profile/favorite/add',
        method: 'POST',
        body: {
          ...arg
        }
      }),
      async onQueryStarted(arg, {dispatch, getState , queryFulfilled}) {
        try {
          const { data } = await queryFulfilled
          const access_token = await getState().auth.access_token

          dispatch(setCredentials({ user: data.user, access_token }))

          const currentPersona = await getState().auth.persona
          if (currentPersona._id === arg.personaId) {
            const new_persona = data.user.persona.find((person) => person._id === arg.personaId)
            dispatch(setPersona({ persona: new_persona }))
          }

          dispatch(setNotification({
            status: 200,
            message: data.message
          }))
        } catch (err) {
          dispatch(setNotification({
            status: err.error.status, 
            message: err.error.data.message
          }))
        }
      },
      invalidatesTags: (result, error, arg) => [
        {type: 'User', id: arg.userId}
      ],
    }),
    deleteFavorite: builder.mutation({
      query: (arg) => ({
        url: `/profile/favorite/delete`,
        method: 'DELETE',
        body: { ...arg }
      }),
      async onQueryStarted(arg, {dispatch, getState, queryFulfilled}) {
        try {
          const { data } = await queryFulfilled
          const access_token = await getState().auth.access_token

          dispatch(setCredentials({ user: data.user, access_token }))

          const currentPersona = await getState().auth.persona
          if (currentPersona._id === arg.personaId) {
            const new_persona = data.user.persona.find((person) => person._id === arg.personaId)
            dispatch(setPersona({ persona: new_persona }))
          }
          
          dispatch(setNotification({
            status: 200,
            message: data.message
          }))
        } catch (err) {
          dispatch(setNotification({
            status: err.error.status, 
            message: err.error.data.message
          }))
        }
      },
      invalidatesTags: (result, error, arg) => [
        {type: 'User', id: arg.userId}
      ]
    })
  })
})


export const {
  useSignInMutation,
  useSignUpMutation,
  useSignOutMutation,
  useUpdateInfoMutation,
  useDeleteAccountMutation,
  useAddFavoriteMutation,
  useDeleteFavoriteMutation
} = authApiSlice