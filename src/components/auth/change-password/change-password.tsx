import { useForm } from 'react-hook-form'

import { ControlledTextField } from '@/components/controlled'
import { Button, Card, Typography } from '@/components/ui'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './change-password.module.scss'

export type ChangePasswordFormValues = z.infer<typeof changePasswordScheme>

const changePasswordScheme = z.object({
  email: z.string().email().min(1, 'Enter email'),
})

export const ChangePassword = () => {
  const { control, handleSubmit } = useForm<ChangePasswordFormValues>({
    defaultValues: {
      email: '',
    },
    mode: 'onSubmit',
    resolver: zodResolver(changePasswordScheme),
  })
  const onSubmit = (data: ChangePasswordFormValues) => {
    console.log(data)
  }

  return (
    <Card className={s.card}>
      <DevTool control={control} />
      <Typography className={s.title} variant={'h1'}>
        Forgot your password?
      </Typography>
      <form className={s.loginForm} onSubmit={handleSubmit(onSubmit)}>
        <ControlledTextField control={control} label={'Email'} name={'email'} />
        <Typography className={s.info} variant={'body2'}>
          Enter your email address and we will send you further instructions
        </Typography>
        <Button className={s.button} fullWidth type={'submit'}>
          Send Instructions
        </Button>
      </form>
      <Typography className={s.caption} variant={'body2'}>
        Did you remember your password?
      </Typography>
      <Typography as={'a'} className={s.loginLink} href={'#'} variant={'signUp'}>
        Try logging in
      </Typography>
    </Card>
  )
}
