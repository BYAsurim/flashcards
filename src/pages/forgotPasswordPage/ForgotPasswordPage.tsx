import { ForgotPassword } from '@/components/auth'
import { Page } from '@/components/ui'
import { useForgotPasswordMutation } from '@/services/auth'

export const ForgotPasswordPage = () => {
  const [forgotPassword] = useForgotPasswordMutation()
  const recoverPasswordHandler = async (email: string) => {
    try {
      await forgotPassword({ email })
      // await router.navigate('/login')
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
