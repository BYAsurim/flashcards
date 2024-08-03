import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { ControlledTextField } from '@/components/controlled'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './forgotPassword.module.scss'

const signUpSchema = z.object({
  email: z.string().email(),
})

type FormValues = z.infer<typeof signUpSchema>

type Props = {
  recoverPassword: (email: string) => void
}

export const ForgotPassword = ({ recoverPassword }: Props) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(signUpSchema),
  })

  const handleRecoverPassword = (data: FormValues) => {
    recoverPassword(data.email)
  }

  return (
    <Card>
      <Typography as={'h2'}>Forgot your password?</Typography>
      <form className={s.form} onSubmit={handleSubmit(handleRecoverPassword)}>
        <ControlledTextField
          control={control}
          errorMessage={errors.email?.message}
          label={'Email'}
          name={'email'}
        />
        <Typography as={'p'} className={s.form__description} variant={'body2'}>
          Enter your email address and we will send you further instructions{' '}
        </Typography>
        <Button fullWidth type={'submit'}>
          Send Instructions
        </Button>
      </form>
      <div className={s.bottom}>
        <Typography as={'p'} variant={'body2'}>
          Did you remember your password?
        </Typography>
        <Typography as={Link} className={s.logIn} to={'/login'} variant={'link1'}>
          Try logging in
        </Typography>
      </div>
    </Card>
  )
}
