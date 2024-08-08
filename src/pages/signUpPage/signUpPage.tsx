import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { SignUp } from '@/components/auth'
import { Page } from '@/components/ui'
import { AuthErrorResponse, SignUpArgs, useSignUpMutation } from '@/services/auth'

export const SignUpPage = () => {
  const [signUp] = useSignUpMutation()
  const navigate = useNavigate()
  const handleSignUp = async ({ email, name, password }: SignUpArgs) => {
    try {
      await signUp({ email, name, password }).unwrap()
      navigate('/')
    } catch (e: unknown) {
      const err = e as AuthErrorResponse

      toast.error(err?.data.message ?? 'Uncaught error.')
    }
  }

  return (
    <Page>
      <SignUp onSubmit={handleSignUp} />
    </Page>
  )
}
