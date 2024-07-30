import { SignIn } from '@/components/auth'
import { Page } from '@/components/ui'
import { useLoginMutation } from '@/services/auth/authApi'
import { LoginArgs } from '@/services/auth/authApi.types'

export const SignInPage = () => {
  const [login] = useLoginMutation()

  const signInHandler = async (data: LoginArgs) => {
    try {
      await login(data)
    } catch (error) {
      alert(error)
    }
  }

  return (
    <Page>
      <SignIn onSubmit={signInHandler} />
    </Page>
  )
}
