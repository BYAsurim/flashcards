import { toast } from 'react-toastify'

import { SignIn } from '@/components/auth'
import { Page } from '@/components/ui'
import { useLoginMutation } from '@/services/auth/authApi'
import { AuthErrorResponse, LoginArgs } from '@/services/auth/authApi.types'

export const SignInPage = () => {
  const [login] = useLoginMutation()

  const signInHandler = async (data: LoginArgs) => {
    try {
      await toast.promise(login(data).unwrap(), { pending: 'In Progress', success: 'Success' })
    } catch (error: unknown) {
      const err = error as AuthErrorResponse

      toast.error(err?.data?.message ?? 'Login failed.')
    }
  }

  return (
    <Page>
      <SignIn onSubmit={signInHandler} />
    </Page>
  )
}
