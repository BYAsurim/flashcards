import { useForm } from 'react-hook-form'

import { ControlledTextField } from '@/components/controlled'
import { Typography } from '@/components/ui'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { CheckboxForm } from '@/components/ui/form/checkbox-form'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './sign-in.module.scss'

export type LoginFormValues = z.infer<typeof loginScheme>

export type SingInProps = {
  onSubmit: (data: LoginFormValues) => void
}

const loginScheme = z.object({
  email: z.string().email(),
  password: z.string().min(3).max(30),
  rememberMe: z.boolean().default(false),
})

export const SignIn = ({ onSubmit }: SingInProps) => {
  const { control, handleSubmit } = useForm<LoginFormValues>({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    mode: 'onSubmit',
    resolver: zodResolver(loginScheme),
  })

  return (
    <Card className={s.card}>
      <DevTool control={control} />
      <Typography className={s.title} variant={'h1'}>
        Sign In
      </Typography>
      <form className={s.loginForm} onSubmit={handleSubmit(onSubmit)}>
        <ControlledTextField control={control} label={'Email'} name={'email'} />
        <ControlledTextField
          control={control}
          label={'Password'}
          name={'password'}
          type={'password'}
        />
        <CheckboxForm
          className={s.checkbox}
          control={control}
          label={'Remember me'}
          name={'rememberMe'}
        />
        <Typography variant={'body2'}>
          <a className={s.forgotPassword} href={'#'}>
            Forgot Password?
          </a>
        </Typography>
        <Button className={s.signIn} fullWidth type={'submit'}>
          Sign In
        </Button>
      </form>
      <Typography className={s.caption} variant={'body2'}>
        {`Don't have an account?`}
      </Typography>
      <Typography as={'a'} className={s.signUpLink} href={'#'} variant={'link1'}>
        Sign Up
      </Typography>
    </Card>
  )
}
