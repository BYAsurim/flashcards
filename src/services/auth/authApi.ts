import { LoginArgs, User } from '@/services/auth/authApi.types'
import { flashcardsApi } from '@/services/flashcards-api'

const authApi = flashcardsApi.injectEndpoints({
  endpoints: builder => {
    return {
      getMe: builder.query<User | undefined, void>({
        providesTags: ['Me'],
        query: () => ({
          method: 'GET',
          url: '/v1/auth/me',
        }),
      }),
      login: builder.mutation<void, LoginArgs>({
        invalidatesTags: ['Me'],
        query: body => ({
          body,
          method: 'POST',
          url: '/v1/auth/login',
        }),
      }),
      // logout: builder.mutation<void, void>({
      //   invalidatesTags: ['Me'],
      //   async onQueryStarted(_, { dispatch, queryFulfilled }) {
      //     const patchResult = dispatch(
      //       authApi.util.updateQueryData('getMe', undefined, () => {
      //         return undefined
      //       })
      //     )
      //
      //     try {
      //       await queryFulfilled
      //     } catch {
      //       patchResult.undo()
      //
      //       /**
      //        * Alternatively, on failure you can invalidate the corresponding cache tags
      //        * to trigger a re-fetch:
      //        * dispatch(api.util.invalidateTags(['Post']))
      //        */
      //     }
      //   },
      //   query: () => {
      //     return { method: 'POST', url: `v1/auth/logout` }
      //   },
      // }),
      logout: builder.mutation<void, void>({
        invalidatesTags: (_, error) => (error ? [] : ['Me']),
        async onQueryStarted(_, { dispatch, queryFulfilled }) {
          const patchResult = dispatch(authApi.util.updateQueryData('getMe', _, () => {}))

          try {
            await queryFulfilled
            dispatch(flashcardsApi.util.resetApiState())
          } catch (e) {
            patchResult.undo()
          }
        },
        query: () => ({ method: 'POST', url: '/v1/auth/logout' }),
      }),
    }
  },
})

export const { useGetMeQuery, useLoginMutation, useLogoutMutation } = authApi
