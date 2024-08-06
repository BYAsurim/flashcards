import { ForgotPassword } from '@/components/auth'
import { Page } from '@/components/ui'
import { router } from '@/router/router'
import { useForgotPasswordMutation } from '@/services/auth'

export const ForgotPasswordPage = () => {
  const [forgotPassword] = useForgotPasswordMutation()

  const recoverPasswordHandler = async (email: string) => {
    try {
      await forgotPassword({ email })
      await router.navigate('/checkEmail', { state: { email } })
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <Page>
      <ForgotPassword recoverPassword={recoverPasswordHandler} />
    </Page>
  )
}
