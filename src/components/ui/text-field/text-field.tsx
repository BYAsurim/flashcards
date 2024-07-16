import React, { ChangeEvent, ComponentPropsWithoutRef, forwardRef, useState } from 'react'

import { Icon } from '@/components/ui/icon/icon'
import { Typography } from '@/components/ui/typography'
import { clsx } from 'clsx'

import s from './text-field.module.scss'

export type TextFieldProps = {
  errorMessage?: string
  label?: string
  onValueChange?: (value: string) => void
  type?: 'password' | 'search' | 'text' | null
} & ComponentPropsWithoutRef<'input'>

type PropsType = Omit<ComponentPropsWithoutRef<'input'>, keyof TextFieldProps> & TextFieldProps

export const TextField = forwardRef<HTMLInputElement, PropsType>(
  (
    {
      className,
      errorMessage,
      label,
      name,
      onChange,
      onValueChange,
      placeholder,
      type = 'text',
      ...rest
    },
    ref
  ) => {
    const [passwordType, setPasswordType] = useState('password')
    const onClickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()
      if (passwordType === 'password') {
        setPasswordType('text')
      } else {
        setPasswordType('password')
      }
    }

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
      onChange?.(e)
      onValueChange?.(e.target.value)
    }

    const classNames = {
      error: clsx(s.error, !!errorMessage && s.errorMessage),
      eyeButton: clsx(s.eyeButton, rest.disabled && s.disabled, className),
      field: clsx(s.field, !!errorMessage && s.error, className),
      label: clsx(s.label, rest.disabled && s.disabled, className),
      searchButton: clsx(s.searchButton, rest.disabled && s.disabled, className),
    }

    // console.log(errorMessage)

    return (
      <div>
        {label && (
          <Typography as={'label'} variant={'body2'}>
            <label className={classNames.label}>{label}</label>
          </Typography>
        )}
        <div className={s.wrap}>
          {type === 'search' && (
            <button className={classNames.searchButton} disabled={rest.disabled} type={'button'}>
              <Icon height={'20'} iconId={'searchIcon'} viewBox={'0 0 20 20'} width={'20'} />
            </button>
          )}
          {type === 'password' && (
            <button
              className={classNames.eyeButton}
              disabled={rest.disabled}
              onClick={onClickHandler}
              type={'button'}
            >
              <Icon
                height={'16'}
                iconId={passwordType === 'password' ? 'eyeOn' : 'eyeOff'}
                viewBox={'2 0 20 20'}
                width={'16'}
              />
            </button>
          )}
          <div>
            <Typography variant={'body1'}>
              <input
                className={classNames.field}
                name={name}
                onChange={handleChange}
                placeholder={placeholder}
                type={type === 'password' ? passwordType : type}
                {...rest}
                ref={ref}
              />
            </Typography>
          </div>
        </div>
        {errorMessage && (
          <Typography className={classNames.error} variant={'caption'}>
            {errorMessage}
          </Typography>
        )}
      </div>
    )
  }
)
