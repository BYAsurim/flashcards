import { useNavigate } from 'react-router-dom'

import { SignUp } from '@/components/auth'
import { Page } from '@/components/ui'
import { SignUpArgs, useSignUpMutation } from '@/services/auth'

export const SignUpPage = () => {
  const [signUp] = useSignUpMutation()
  const navigate = useNavigate()
  const handleSignUp = async ({ email, name, password }: SignUpArgs) => {
    try {
      await signUp({ email, name, password }).unwrap()
      navigate('/')
    } catch (e: any) {
      alert(e.errorMessages[0])
    }
  }

  return (
    <Page>
      <SignUp onSubmit={handleSignUp} />
    </Page>
  )
}
