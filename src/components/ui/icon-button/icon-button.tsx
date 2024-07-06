import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

import { Icon, IconPropsType } from '@/components/ui/icon/icon'
import { clsx } from 'clsx'

import s from './icon-button.module.scss'

export type IconButtonProps<T extends ElementType = 'button'> = {
  as?: T
  children?: ReactNode
  className?: string
  fullWidth?: boolean
  variant?: 'primary' | 'secondary'
} & ComponentPropsWithoutRef<T> &
  IconPropsType

export const IconButton = <T extends ElementType = 'button'>(props: IconButtonProps<T>) => {
  const {
    as: Component = 'button',
    children,
    className,
    fullWidth,
    height = '16',
    iconId,
    variant = 'primary',
    viewBox = '0 0 16 16',
    width = '16',
    ...rest
  } = props

  return (
    <Component className={clsx(s[variant], fullWidth && s.fullWidth, className)} {...rest}>
      <Icon height={height} iconId={iconId} viewBox={viewBox} width={width}></Icon>
      {children}
    </Component>
  )
}
