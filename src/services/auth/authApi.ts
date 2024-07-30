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
      logout: builder.mutation<void, void>({
        query: () => ({
          invalidatesTags: ['Me'],
          method: 'POST',
          url: '/v1/auth/logout',
        }),
      }),
    }
  },
})

export const { useGetMeQuery, useLoginMutation, useLogoutMutation } = authApi
