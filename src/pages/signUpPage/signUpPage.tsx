import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { SignUp } from '@/components/auth'
import { Page } from '@/components/ui'
import { SignUpArgs, useSignUpMutation } from '@/services/auth'

export const SignUpPage = () => {
  const [signUp] = useSignUpMutation()
  const navigate = useNavigate()
  const handleSignUp = async ({ email, name, password }: SignUpArgs) => {
    try {
      await toast.promise(signUp({ email, name, password }).unwrap(), {
        pending: 'In Progress',
        success: 'Success',
      })
      navigate('/')
    } catch (e: unknown) {
      const err = e as {
        data: {
          errorMessages: string[]
        }
      }

      toast.error(err?.data.errorMessages[0] ?? 'Uncaught error.')
    }
  }

  return (
    <Page>
      <SignUp onSubmit={handleSignUp} />
    </Page>
  )
}
