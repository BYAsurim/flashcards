import { LoginArgs, ResetPasswordArgs, SignUpArgs, User } from '@/services/auth/authApi.types'
import { flashcardsApi } from '@/services/flashcards-api'

const authApi = flashcardsApi.injectEndpoints({
  endpoints: builder => {
    return {
      delete: builder.mutation<void, void>({
        // invalidatesTags: ['Me'],
        query: () => ({
          method: 'DELETE',
          url: '/v1/auth/me',
        }),
      }),
      forgotPassword: builder.mutation<void, { email: string }>({
        query: ({ email }) => ({
          body: {
            email,
            html: '\n<div>\n  <h1 style="margin-top:0;color:#333333;font-size:24px;font-weight:bold;text-align:left">\n    Password Recovering\n  </h1>\n\n  <p style="color:#51545e;margin:0.4em 0 1.1875em;font-size:16px;line-height:1.625">\n    Resetting your password is easy. Just press the link below and follow the instructions. We\'ll have you up and running in no time.\n  </p>\n\n  <div style="color:#51545e;margin:0.4em 0 4.1875em;font-size:16px;line-height:1.625">\n    <a href="http://localhost:5173/newPassword/##token##" >Reset Password</a>\n  </div>\n  \n  <p style="margin:0;font-family:lato,\'helvetica neue\',helvetica,arial,sans-serif;letter-spacing:0;font-size:16px;font-style:normal;font-weight:normal;line-height:19px;color:#6fa8dc">\n      If you didn\'t request this message just ignore it.\n  </p>\n</div>\n',
            subject: 'password recovery',
          },
          method: 'POST',
          url: '/v1/auth/recover-password',
        }),
      }),
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
        invalidatesTags: ['Me'],
        async onQueryStarted(_, { dispatch, queryFulfilled }) {
          const patchResult = dispatch(
            authApi.util.updateQueryData('getMe', undefined, () => {
              return undefined
            })
          )

          try {
            await queryFulfilled
          } catch {
            patchResult.undo()

            /**
             * Alternatively, on failure you can invalidate the corresponding cache tags
             * to trigger a re-fetch:
             * dispatch(api.util.invalidateTags(['Post']))
             */
          }
        },
        query: () => {
          return { method: 'POST', url: `v1/auth/logout` }
        },
      }),
      resetPassword: builder.mutation<void, ResetPasswordArgs>({
        query: ({ token, ...args }) => ({
          body: args,
          method: 'POST',
          url: `/v1/auth/reset-password/${token}`,
        }),
      }),

      // logout: builder.mutation<void, void>({
      //   invalidatesTags: (_, error) => (error ? [] : ['Me']),
      //   async onQueryStarted(_, { dispatch, queryFulfilled }) {
      //     const patchResult = dispatch(authApi.util.updateQueryData('getMe', undefined, () => {}))
      //
      //     try {
      //       await queryFulfilled
      //       dispatch(flashcardsApi.util.resetApiState())
      //     } catch (e) {
      //       patchResult.undo()
      //     }

      //   },
      //   query: () => ({ method: 'POST', url: '/v1/auth/logout' }),
      // }),
      signUp: builder.mutation<User, SignUpArgs>({
        // invalidatesTags: ['Me'], хз мб и надо ???
        query: body => ({
          body,
          method: 'POST',
          url: '/v1/auth/sign-up',
        }),
      }),
      upDateProfile: builder.mutation<User, FormData>({
        invalidatesTags: ['Me'],
        query: body => ({
          body,
          method: 'PATCH',
          url: '/v1/auth/me',
        }),
      }),
    }
  },
})

export const {
  useDeleteMutation,
  useForgotPasswordMutation,
  useGetMeQuery,
  useLoginMutation,
  useLogoutMutation,
  useResetPasswordMutation,
  useSignUpMutation,
  useUpDateProfileMutation,
} = authApi
