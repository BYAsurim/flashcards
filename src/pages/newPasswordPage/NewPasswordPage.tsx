import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import { NewPassword } from '@/components/auth'
import { Page } from '@/components/ui'
import { router } from '@/router/router'
import { AuthErrorResponse, useResetPasswordMutation } from '@/services/auth'

export const NewPasswordPage = () => {
  const [resetPassword] = useResetPasswordMutation()
  const { token } = useParams()

  const resetPasswordHandler = async (password: string) => {
    try {
      if (token) {
        await toast.promise(resetPassword({ password, token }), {
          pending: 'In Progress',
          success: 'Success',
        })
        await router.navigate('/login')
      }
    } catch (e) {
      const err = e as AuthErrorResponse

      toast.error(err?.data?.message ?? 'Uncaught error.')
    }
  }

  return (
    <Page>
      <NewPassword resetPassword={resetPasswordHandler} />
    </Page>
  )
}
