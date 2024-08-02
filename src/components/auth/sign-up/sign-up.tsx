import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { ControlledTextField } from '@/components/controlled'
import { Button, Card, Typography } from '@/components/ui'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './sign-up.module.scss'

export type SignUpProps = {
  onSubmit: (data: SignUpFormValues) => void
}

export type SignUpFormValues = z.infer<typeof signUpScheme>

const signUpScheme = z
  .object({
    email: z.string().email(),
    name: z.string().min(3).max(30),
    password: z.string().min(3).max(30),
    passwordConfirmation: z.string().min(1, 'Confirm your password').min(3),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.passwordConfirmation) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Passwords do not match',
        path: ['passwordConfirmation'],
      })
    }

    return data
  })

export const SignUp = ({ onSubmit }: SignUpProps) => {
  const { control, handleSubmit } = useForm<SignUpFormValues>({
    defaultValues: {
      email: '',
      name: '',
      password: '',
      passwordConfirmation: '',
    },
    mode: 'onSubmit',
    resolver: zodResolver(signUpScheme),
  })

  return (
    <Card className={s.card}>
      <DevTool control={control} />
      <Typography className={s.title} variant={'h1'}>
        Sign Up
      </Typography>
      <form className={s.loginForm} onSubmit={handleSubmit(onSubmit)}>
        <ControlledTextField control={control} label={'Email'} name={'email'} />
        <ControlledTextField control={control} label={'Name'} name={'name'} />
        <ControlledTextField
          control={control}
          label={'Password'}
          name={'password'}
          type={'password'}
        />
        <ControlledTextField
          control={control}
          label={'Confirm Password'}
          name={'passwordConfirmation'}
          type={'password'}
        />
        <Button className={s.signUp} fullWidth type={'submit'}>
          Sign Up
        </Button>
      </form>
      <Typography className={s.caption} variant={'body2'}>
        Already have an account?
      </Typography>
      <Typography as={Link} className={s.signInLink} to={'/login'} variant={'link1'}>
        Sign In
      </Typography>
    </Card>
  )
}
