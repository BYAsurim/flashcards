import { useParams } from 'react-router-dom'

import { NewPassword } from '@/components/auth'
import { Page } from '@/components/ui'
import { router } from '@/router/router'
import { useResetPasswordMutation } from '@/services/auth'

export const NewPasswordPage = () => {
  const [resetPassword] = useResetPasswordMutation()
  const { token } = useParams()

  const resetPasswordHandler = async (password: string) => {
    try {
      if (token) {
        await resetPassword({ password, token })
        await router.navigate('/login')
      }
    } catch (e) {
      console.info(e)
    }
  }

  return (
    <Page>
      <NewPassword resetPassword={resetPasswordHandler} />
    </Page>
  )
}
