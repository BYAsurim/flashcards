import { toast } from 'react-toastify'

import { ForgotPassword } from '@/components/auth'
import { Page } from '@/components/ui'
import { router } from '@/router/router'
import { AuthErrorResponse, useForgotPasswordMutation } from '@/services/auth'

export const ForgotPasswordPage = () => {
  const [forgotPassword] = useForgotPasswordMutation()

  const recoverPasswordHandler = async (email: string) => {
    try {
      await toast.promise(forgotPassword({ email }).unwrap(), {
        pending: 'In progress',
        success: 'Success',
      })
      await router.navigate('/checkEmail', { state: { email } })
    } catch (e: unknown) {
      const err = e as AuthErrorResponse

      toast.error(err?.data?.message ?? 'Uncaught error.')
    }
  }

  return (
    <Page>
      <ForgotPassword recoverPassword={recoverPasswordHandler} />
    </Page>
  )
}
